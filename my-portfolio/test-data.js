const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://mgmseglmmwfconijocmc.supabase.co";
const supabaseKey = "sb_publishable_HusL_kga6nQVbxN_KdHASg_24GgdePX";

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
  const hero = await supabase.from("hero").select("*").single();
  console.log("Hero Data:", hero.data, "Error:", hero.error?.message);

  const exp = await supabase.from("experiences").select("*");
  console.log("Experiences Data length:", exp.data?.length, "Error:", exp.error?.message);

  const cert = await supabase.from("certifications").select("*");
  console.log("Certificates Data length:", cert.data?.length, "Error:", cert.error?.message);
}

checkData();
