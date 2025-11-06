import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Upload, X, Save } from 'lucide-react';
import Container from '../../components/ui/Container';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { categories } from '../../data/categories';
import { useToaster } from '../../components/ui/Toaster';
import { supabase } from '../../lib/supabase';

const CategoryImages = () => {
  const { addToast } = useToaster();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>(
    Object.fromEntries(categories.map(cat => [cat.id, cat.imageUrl]))
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!selectedCategory || !file) {
      addToast('Please select a category and image', 'error');
      return;
    }

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${selectedCategory}.${fileExt}`;
      const filePath = `categories/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file, {
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      // Update the local state with the new image URL
      setCategoryImages(prev => ({
        ...prev,
        [selectedCategory]: publicUrl
      }));

      addToast('Category image updated successfully', 'success');
      
      // Reset form but keep the updated images
      setSelectedCategory(null);
      setPreviewImage(null);
      setFile(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      addToast('Error uploading image', 'error');
    }
  };

  return (
    <>
      <Helmet>
        <title>Category Images | Admin Dashboard</title>
      </Helmet>

      <Container className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Category Images</h1>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Categories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`
                        p-4 rounded-lg border cursor-pointer transition-all
                        ${selectedCategory === category.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                        }
                      `}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="aspect-video rounded-md overflow-hidden bg-gray-100 mb-3">
                        <img
                          src={categoryImages[category.id] || category.imageUrl}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Image</h2>
                {selectedCategory ? (
                  <div>
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-2">
                        Selected category: {categories.find(c => c.id === selectedCategory)?.name}
                      </p>
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        {previewImage ? (
                          <div className="relative">
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="max-w-full h-auto rounded-lg"
                            />
                            <button
                              onClick={() => {
                                setPreviewImage(null);
                                setFile(null);
                              }}
                              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <label className="cursor-pointer">
                              <span className="mt-2 text-sm text-gray-600">
                                Drop an image here or click to upload
                              </span>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedCategory(null);
                          setPreviewImage(null);
                          setFile(null);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSave}
                        disabled={!file}
                        icon={<Save size={16} />}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">
                      Select a category from the left to update its image
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default CategoryImages;