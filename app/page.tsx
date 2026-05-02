import Footer from "@/components/layout/footer";
import About from "@/components/sections/about";
import Concerns from "@/components/sections/concerns";
import DomainSearch from "@/components/sections/domain-search";
import FAQs from "@/components/sections/faqs";
import Hero from "@/components/sections/hero";
import Pricing from "@/components/sections/pricing";
import ProblemJourney from "@/components/sections/problem-journey";
import Service from "@/components/sections/service";
import Testimonials from "@/components/sections/testimonials";
import WorkProcess from "@/components/sections/work-process";
import {
	FAQStructuredData,
	PricingStructuredData,
	ServiceStructuredData,
} from "@/components/seo/structured-data";
import SubscribeForm from "@/components/subscribe-form";

export default function HomePage() {
	return (
		<>
			<ServiceStructuredData />
			<FAQStructuredData />
			<PricingStructuredData />

			<div className="container mx-auto">
				<main className="home-page px-4 max-w-screen-xl pt-16 mx-auto">
					<Hero />
					<ProblemJourney />
					<Service />
					<Concerns />
					<WorkProcess />
					<Pricing />
					<DomainSearch />
					<About />
					<Testimonials />
					<FAQs />
				</main>
				<SubscribeForm />
				<Footer />
			</div>
		</>
	);
}
