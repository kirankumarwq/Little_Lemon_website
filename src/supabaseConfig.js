import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://hmhxzeucvxzeqnpwzuwk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtaHh6ZXVjdnh6ZXFucHd6dXdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMDczNTksImV4cCI6MjA1NDY4MzM1OX0.NUvtw8YfL0xcPT19a89mNXn860-5q_53c1czIsHueII";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
