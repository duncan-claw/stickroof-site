class PagesController < ApplicationController
  SERVICE_AREAS = [
    "Geelong", "Newtown", "Belmont", "Highton", "Herne Hill", "Manifold Heights", "Hamlyn Heights",
    "North Geelong", "South Geelong", "East Geelong", "Geelong West", "Rippleside", "Drumcondra",
    "Norlane", "Corio", "Lara", "Waurn Ponds", "Grovedale", "Marshall", "Armstrong Creek",
    "Mount Duneed", "Torquay", "Jan Juc", "Anglesea", "Winchelsea", "Ocean Grove", "Barwon Heads",
    "Point Lonsdale", "Queenscliff", "Drysdale", "Clifton Springs", "Leopold", "Portarlington",
    "Werribee", "Little River", "Bannockburn", "Teesdale", "Inverleigh", "Colac", "Birregurra"
  ].freeze

  SERVICES = [
    "Complex stick frame roofs",
    "Renovation and extension roof framing",
    "Specialist carpentry and structural detailing",
    "Joinery and tailored finishing work",
    "Project management for tricky builds"
  ].freeze

  BENEFITS = [
    {
      title: "Hard roof geometry, handled",
      copy: "Pitched intersections, hips, valleys, raked ceilings, awkward spans — the work most crews avoid is the work we specialise in."
    },
    {
      title: "Built for builders who need certainty",
      copy: "Bring us in when the framing has to be right, the sequencing matters, and you want fewer surprises once the roof starts taking shape."
    },
    {
      title: "Clear communication on site",
      copy: "You get practical advice, reliable phone contact, and a carpenter who understands both the detail work and the bigger picture."
    }
  ].freeze

  GALLERY_ITEMS = [
    {
      src: "/images/gallery/stick-roof-geelong-complex-roof-framing.jpg",
      title: "Complex roof framing",
      alt: "Complex stick frame roof under construction with intersecting timber members and angled rafters",
      width: 1600,
      height: 1514
    },
    {
      src: "/images/gallery/stick-roof-custom-pitched-roof-structure.jpg",
      title: "Custom pitched roof structure",
      alt: "Custom pitched stick roof structure being framed on a residential build",
      width: 1600,
      height: 1001
    },
    {
      src: "/images/gallery/stick-roof-hip-roof-framing-diagram.jpg",
      title: "Hip roof framing detail",
      alt: "Hip roof framing diagram showing ridge lines, rafters and roof geometry",
      width: 1600,
      height: 1021
    },
    {
      src: "/images/gallery/stick-roof-dormers-and-dormer-conversions.jpg",
      title: "Dormers and dormer conversions",
      alt: "Traditional roof with two dormers showing dormer conversion and custom roof framing work",
      width: 600,
      height: 450
    },
    {
      src: "/images/gallery/stick-roof-residential-roof-build.jpg",
      title: "Residential roof build",
      alt: "Residential stick roof framing on a house extension with timber rafters and roof structure in place",
      width: 1600,
      height: 1173
    }
  ].freeze

  before_action :prepare_lead, only: %i[home contact]

  def home
    @page_title = "Traditional Stick Roof | Stick Frame Roof Specialists in Geelong"
    @meta_description = "Stick Roof builds difficult stick frame roofs, specialist carpentry, and joinery across Geelong and surrounding areas. If it’s too difficult for most carpenters, try us."
    @services = SERVICES
    @benefits = BENEFITS
    @gallery_items = GALLERY_ITEMS
  end

  def stick_roofs
    @page_title = "Stick Roofs Geelong | Specialist Roof Framing by Traditional Stick Roof"
    @meta_description = "Need a stick roof carpenter in Geelong? Stick Roof specialises in complex roof framing, renovations, extensions, and hard-to-build roof structures."
    @gallery_items = GALLERY_ITEMS
  end

  def carpentry_joinery
    @page_title = "Carpentry & Joinery Geelong | Specialist Carpentry by Traditional Stick Roof"
    @meta_description = "Specialist carpentry, joinery, structural detailing, and project support in Geelong for jobs that need more than a standard crew."
  end

  def service_area
    @page_title = "Service Area | Geelong, Surf Coast, Bellarine & Surrounds"
    @meta_description = "Stick Roof services Geelong, the Surf Coast, Bellarine Peninsula, Werribee corridor, Colac direction, and nearby suburbs within roughly 40 minutes."
  end

  def contact
    @page_title = "Contact Traditional Stick Roof | Geelong Roof Carpentry & Joinery"
    @meta_description = "Call or message Stick Roof for stick roofs, specialist carpentry, joinery, and project management across Geelong and surrounding areas."
  end

  def thank_you
    @page_title = "Thanks | Traditional Stick Roof"
    @meta_description = "Your enquiry has been sent to Stick Roof. We’ll be in touch shortly."
  end

  private

  def prepare_lead
    @lead = Lead.new(source_path: request.path)
  end
end
