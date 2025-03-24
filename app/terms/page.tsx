import SiteLayout from "@/components/shared/site-layout"

export default function TermsPage() {
  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing and using Project Mewo, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Intellectual Property</h2>
            <p className="mb-4">
              The content, features, and functionality of Project Mewo are owned by Project Mewo and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
            <p className="mb-4">
              You are responsible for your use of our services and any content you provide, including compliance with applicable laws, rules, and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Modifications</h2>
            <p className="mb-4">
              We reserve the right to modify or replace these terms at any time. We will provide notice of any significant changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Contact</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us at shimeji.rin@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}
