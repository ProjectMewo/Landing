import SiteLayout from "@/components/shared/site-layout"

export default function PrivacyPage() {
  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information I Collect</h2>
            <p className="mb-4">
              This site is just a project listing and a blog reader.
              I do not collect any personal information from you
              except for the information you provide when you contact me.
            </p>
            <p className="mb-4">
              I do not monitor external link, and I am not responsible for the privacy practices of other sites. If you click on an external link, you are subject to their privacy policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information Sharing</h2>
            <p className="mb-4">
              As stated above, I do not collect any personal information from you. Therefore, I do not share any personal information with third parties. 
            </p>
            <p className="mb-4">
              However, you are still subject to the privacy policy of the external site if you click on an external link. I am not responsible for the privacy practices of other sites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
            <p className="mb-4">
              I use cookies. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information.
            </p>
            <p className="mb-4">
              The only piece of cookie this site stores is when you
              try to log in to the admin panel, and somehow success.
              This cookie is used to remember your session, but it
              should not happen.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Contact Me</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact me at shimeji.rin@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}
