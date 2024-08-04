
import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill'
const supabaseUrl = 'https://maqxwncohgoqytcqhlta.supabase.co'
const SUPABASE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1hcXh3bmNvaGdvcXl0Y3FobHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU4NTgyNTgsImV4cCI6MjAyMTQzNDI1OH0.0ybJzEZyoWvDKCTkc5vNWnvfdKmzhPJXQ-uRTCqE7f0'
export const supabase = createClient(supabaseUrl, SUPABASE_KEY);