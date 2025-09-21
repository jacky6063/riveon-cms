import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://byajesarlzmednorryoo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5YWplc2FybHptZWRub3JyeW9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMDkwNjcsImV4cCI6MjA2OTc4NTA2N30.ilsdU8VnKz2FLG6-XV0cK31aOLnHIv1oexD_CgK4BE4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
