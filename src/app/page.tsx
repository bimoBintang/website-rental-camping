import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaaturesSection";
import ProductSection from "@/components/ProductSection";
import WorkSection from "@/components/WorksSection";
import CtaSection from "@/components/CtaSection";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactForm from "@/components/ContactForm";
import { submitContactForm } from "./actions/contact";
import { getBanner } from "./actions/banner";
import { getProduct } from "./actions/product";

export const dynamic = "force-dynamic";

export default async function Home() {
  const banner = await getBanner();
  const product = await getProduct();
  return (
    <main className="min-h-screen">
      
      
      {/* Hero Section */}
      <HeroSection banner={banner[0]}/>

      {/* Features Section */}
      <FeaturesSection />

      {/* Products Section */}
      <ProductSection products={product}/>

       {/* WhatsApp Button - sticky positioned at bottom right corner */}
       <WhatsAppButton 
        phoneNumber="+628121032345" 
        message="Hi, I'm interested in your services!"
      />

      {/* How It Works Section */}
      <WorkSection />

      {/* Testimonials Section */}
      {/* <TestimonialSection /> */}

      {/* CTA Section */}
      <CtaSection />

      {/* Contact Section */}
      <ContactSection>
        <ContactForm contact={submitContactForm} />
      </ContactSection>

      
    </main>
  );
}