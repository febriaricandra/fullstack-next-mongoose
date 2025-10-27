import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { models } from "mongoose";
import Product from "@/models/Product";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectDB();
    
    // Clear existing mongoose models to ensure fresh schema
    Object.keys(models).forEach(modelName => {
      delete models[modelName];
    });
    
    //delete all products and seed new ones


    const products = [
      {
        name: "Nasi Goreng",
        description: "Nasi Goreng lezat murah meriah",
        price: 50000,
        image: "https://awsimages.detik.net.id/community/media/visual/2021/03/29/trik-masak-nasi-goreng-3.jpeg?w=600&q=90",
      },
      {
        name: "Es teh Lemon",
        description: "Minuman klasik menyegarkan untuk haus dan dahaga",
        price: 7500,
        image: "https://asset-2.tribunnews.com/jogja/foto/bank/images/4-resep-varian-es-teh-untuk-buka-puasa-ada-dari-lemon-tea-sampai-thai-tea.jpg",
      },
      {
        name: "Mie Goreng sedap",
        description: "Mie instan di goreng dadakan super sedap!",
        price: 40000,
        image: "https://img-global.cpcdn.com/recipes/bc7c4006c5bd2290/680x781cq80/mie-goreng-sedap-sederhana-foto-resep-utama.jpg",
      },
    ];

    await Product.deleteMany({});
    await Product.insertMany(products);

    // Delete existing users
    await User.deleteMany({});

    // Create admin user instance
    const adminUser = new User({
      name: "Admin",
      email: "admin@example.com",
      password: await bcrypt.hash("adminpassword", 10),
      role: "admin",
      whatsappNumber: "082154011802",
      whatsappVerified: false,
    });

    console.log("Creating admin user with data:", adminUser);
    
    // Save the user
    await adminUser.save();
    
    // Fetch the user from database to verify
    const savedUser = await User.findOne({ email: "admin@example.com" }).lean();
    console.log("Saved admin user in database:", savedUser);

    return NextResponse.json({ message: "Seeding berhasil!", products });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ error: "Seeding gagal" }, { status: 500 });
  }
}
