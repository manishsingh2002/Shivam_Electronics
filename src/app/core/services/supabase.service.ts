// supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private supabaseUrl = 'https://dhnzcdfiuwqgagqlefas.supabase.co' ; // Get from environment
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobnpjZGZpdXdxZ2FncWxlZmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NjM1MjcsImV4cCI6MjA1NDMzOTUyN30.rkbM7V-2kGvf4xJ04_7zEH-c-xODDBMVSERY6qzPOko'; // Get from environment



  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  getSupabaseClient() {
    return this.supabase; //To access client in other services
  }

  async uploadImage(file: File, bucket: string, path: string): Promise<{ error: any } | { data: any }> {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucket) // Specify the bucket name
        .upload(path, file, { // Specify the full path within the bucket
          contentType: file.type, // Important: Set the correct content type
          upsert: false // Prevent overwriting existing files (optional)
        });

      if (error) {
        console.error("Error uploading image:", error);
        return { error };
      } else {
        console.log("Image uploaded successfully:", data);
        return { data };
      }
    } catch (err) {
      console.error("Error during upload:", err);
      return { error: err };
    }
  }


  async getImageUrl(bucket: string, path: string): Promise<string | null> {
      try {
        const { data } = await this.supabase.storage.from(bucket).getPublicUrl(path);
        return data.publicUrl;
      } catch (error) {
        console.error("Error getting image URL:", error);
        return null;
      }
  }

}

  // SUPABASE_URL='https://dhnzcdfiuwqgagqlefas.supabase.co/storage/v1/s3'
  // SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobnpjZGZpdXdxZ2FncWxlZmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NjM1MjcsImV4cCI6MjA1NDMzOTUyN30.rkbM7V-2kGvf4xJ04_7zEH-c-xODDBMVSERY6qzPOko'
  // SUPABASE_BUCKET='shivamelectronicsImages'

//   constructor() {
//     this.supabase = createClient(this.SUPABASE_URL, this.SUPABASE_KEY );
//   }

//   async uploadImage(file: File, bucket: string, path: string) {
//     const { data, error } = await this.supabase.storage
//       .from(bucket)
//       .upload(path, file);

//     if (error) throw error;
//     return data;
//   }
// }