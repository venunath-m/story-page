import Navbar from "./Navbar";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      
      {/* COMMON HEADER */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="flex-1 p-6">
        {children}
      </main>

      {/* COMMON FOOTER */}
      <Footer />
    </div>
  );
}