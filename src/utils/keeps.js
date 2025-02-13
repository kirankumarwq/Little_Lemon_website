import { supabase } from "../supabaseConfig";

// Fetch user data
export const fetchUserData = async () => {
  const { data: user } = await supabase.auth.getUser();
  if (user?.user) {
    return user.user.user_metadata;
  }
  return null;
};

// Update profile data (now includes mobile)
export const updateProfileData = async (updatedData) => {
  const { data: user } = await supabase.auth.getUser();
  if (user?.user) {
    await supabase.auth.updateUser({
      data: { ...user.user_metadata, ...updatedData },
    });
  }
};

// Logout user
export const logoutUser = async () => {
  await supabase.auth.signOut();
};
