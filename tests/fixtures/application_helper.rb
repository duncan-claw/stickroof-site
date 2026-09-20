module ApplicationHelper
  def page_title
    @page_title.presence || "Traditional Stick Roof | Specialist Stick Frame Roofs in Geelong"
  end

  def meta_description
    @meta_description.presence || "Stick Roof builds complex stick frame roofs, specialist carpentry, and joinery across Geelong, the Surf Coast, Bellarine, Werribee corridor, and Colac direction."
  end

  def canonical_host
    Rails.configuration.x.canonical_host.presence || request.host
  end

  def canonical_protocol
    Rails.configuration.x.canonical_protocol.presence || request.protocol.delete_suffix("://")
  end

  def canonical_base_url
    "#{canonical_protocol}://#{canonical_host}"
  end

  def canonical_url
    canonical_url_for(request.fullpath)
  end

  def body_id
    "page-#{controller_name.dasherize}-#{action_name.dasherize}"
  end

  def nav_link_to(label, path)
    classes = ["nav-link"]
    classes << "nav-link--active" if current_page?(path)
    link_to label, path, class: classes.join(" ")
  end

  def local_business_schema
    {
      "@context" => "https://schema.org",
      "@type" => "LocalBusiness",
      "name" => "Stick Roof",
      "url" => canonical_url,
      "image" => [
        "#{canonical_base_url}/icon.png"
      ],
      "telephone" => default_phone_href,
      "email" => default_email_address,
      "areaServed" => PagesController::SERVICE_AREAS.map do |area|
        {
          "@type" => "City",
          "name" => area
        }
      end,
      "address" => {
        "@type" => "PostalAddress",
        "addressLocality" => "Geelong",
        "addressRegion" => "VIC",
        "addressCountry" => "AU"
      },
      "description" => meta_description,
      "priceRange" => "$$",
      "serviceType" => PagesController::SERVICES,
      "sameAs" => []
    }
  end
end
