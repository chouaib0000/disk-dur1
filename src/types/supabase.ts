export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      settings: {
        Row: {
          id: string
          whatsapp_number: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          whatsapp_number: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          whatsapp_number?: string
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          price: number
          originalPrice: number
          discount: number
          stock: number
          rating: number
          reviewCount: number
          imageUrl: string | null
          images: string[] | null
          brand: string | null
          categoryId: string | null
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          price: number
          originalPrice: number
          discount?: number
          stock?: number
          rating?: number
          reviewCount?: number
          imageUrl?: string | null
          images?: string[] | null
          brand?: string | null
          categoryId?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          price?: number
          originalPrice?: number
          discount?: number
          stock?: number
          rating?: number
          reviewCount?: number
          imageUrl?: string | null
          images?: string[] | null
          brand?: string | null
          categoryId?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      diagnostic_requests: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          device_type: string
          problem_description: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone: string
          device_type: string
          problem_description: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string
          device_type?: string
          problem_description?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}