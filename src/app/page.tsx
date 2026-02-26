import { ContactForm } from "@/components/contact-form";
import { HeroShipIllustration } from "@/components/hero-ship-illustration";

export default function Home() {
  return (
    <>
      <nav>
        <div className="nav-inner">
          <a href="#" className="logo">
            <span className="logo-dot"></span> helloship
          </a>
          <div className="nav-links">
            <a href="#solutions">Solutions</a>
            <a href="#process">Process</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href="https://calendly.com/lucasmunro0402/30min" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Get in touch &rarr;
            </a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-layout">
          <div className="hero-copy">
            <div className="hero-label">
              <span className="dot"></span>
              Available for new projects
            </div>
            <h1>
              Real solutions.
              <br />
              <span>Shipped fast.</span>
            </h1>
            <p>
              Helloship is an AI-powered development studio that builds custom
              software, integrations, and automations for businesses that need the
              right solution — not a bigger team.
            </p>
            <div className="hero-actions">
              <a href="https://calendly.com/lucasmunro0402/30min" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Start a project &rarr;
              </a>
              <a href="#solutions" className="btn-secondary">
                What we solve
              </a>
            </div>
          </div>
          <HeroShipIllustration />
        </div>
      </section>

      <div className="trust-bar">
        <div className="trust-label">Our founder has helped teams at</div>
        <div className="trust-logos">
          <span>NFL</span>
          <span>X (Twitter)</span>
          <span>Etsy</span>
          <span>Roblox</span>
          <span>Bolt.new</span>
        </div>
      </div>

      <div className="section" id="solutions">
        <div className="section-header">
          <div className="section-label">Solutions</div>
          <div className="section-title">What we build.</div>
          <div className="section-subtitle">
            You know what your business needs. We figure out the best way to
            build it and get it live.
          </div>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div
              className="service-icon"
              style={{ background: "var(--blue-bg)", color: "var(--blue)" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 4h16v16H4z" />
                <path d="M4 9h16" />
                <path d="M9 4v16" />
              </svg>
            </div>
            <h3>Custom Integrations</h3>
            <p>
              Connect your CRM, payments, tools, and workflows so your business
              runs like one system instead of twenty tabs.
            </p>
          </div>
          <div className="service-card">
            <div
              className="service-icon"
              style={{
                background: "var(--orange-bg)",
                color: "var(--orange)",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M12 20V10M18 20V4M6 20v-4" />
              </svg>
            </div>
            <h3>AI Agents</h3>
            <p>
              Domain-specific agents that monitor, triage, and execute repeat
              workflows for support, sales, and operations teams.
            </p>
          </div>
          <div className="service-card">
            <div
              className="service-icon"
              style={{ background: "var(--pink-bg)", color: "var(--pink)" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            </div>
            <h3>AI Automations</h3>
            <p>
              Workflows, chatbots, and AI-powered tools that handle the
              repetitive stuff so your team can focus on work that matters.
            </p>
          </div>
          <div className="service-card">
            <div
              className="service-icon"
              style={{ background: "var(--green-bg)", color: "var(--green)" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
            </div>
            <h3>Websites &amp; Web Apps</h3>
            <p>
              Marketing sites, customer portals, and web applications. Fast,
              clean, built to convert — not just look good in a mockup.
            </p>
          </div>
          <div className="service-card">
            <div
              className="service-icon"
              style={{
                background: "var(--purple-bg)",
                color: "var(--purple)",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <path d="M12 18h.01" />
              </svg>
            </div>
            <h3>Mobile Apps</h3>
            <p>
              Cross-platform iOS and Android apps built with React Native. One
              codebase, both app stores, real performance.
            </p>
          </div>
          <div className="service-card">
            <div
              className="service-icon"
              style={{ background: "var(--teal-bg)", color: "var(--teal)" }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <h3>MVPs &amp; New Products</h3>
            <p>
              Got an idea that needs to exist? We&apos;ll scope it, build it,
              and get it in front of real users — fast enough to actually learn
              something.
            </p>
          </div>
        </div>
      </div>

      <div className="section" id="process">
        <div className="section-header">
          <div className="section-label">Process</div>
          <div className="section-title">How it works.</div>
          <div className="section-subtitle">
            No bloated timelines. Most projects launch in 2–4 weeks.
          </div>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number" style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}>01 — DISCOVER</div>
            <h3>Understand the problem</h3>
            <p>
              We get on a call, map out what you need, and identify the fastest
              path to a working solution.
            </p>
          </div>
          <div className="step">
            <div className="step-number" style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}>02 — SCOPE</div>
            <h3>Plan the build</h3>
            <p>
              You get a clear proposal — what we&apos;re building, how long it
              takes, and what it costs. No surprises.
            </p>
          </div>
          <div className="step">
            <div className="step-number" style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}>03 — BUILD</div>
            <h3>Ship every week</h3>
            <p>
              We build in weekly sprints using AI-accelerated workflows. You see
              real progress, not status updates.
            </p>
          </div>
          <div className="step">
            <div className="step-number" style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}>04 — LAUNCH</div>
            <h3>Go live</h3>
            <p>
              We deploy, QA, and hand off everything. You own the code, the
              infrastructure, and the momentum.
            </p>
          </div>
        </div>
      </div>

      <div className="section" id="pricing">
        <div className="section-header">
          <div className="section-label">Pricing</div>
          <div className="section-title">Flexible engagements.</div>
          <div className="section-subtitle">
            Every project is different. Here&apos;s how we typically work
            together.
          </div>
        </div>

        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-tier">Sprint</div>
            <div className="pricing-duration" style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}>1–2 weeks</div>
            <p className="pricing-desc">
              A focused build for a single, well-defined problem. Perfect for
              landing pages, integrations, automations, or quick internal tools.
            </p>
            <ul className="pricing-includes">
              <li>Single deliverable</li>
              <li>Weekly check-ins</li>
              <li>Full source code handoff</li>
            </ul>
            <a
              href="https://calendly.com/lucasmunro0402/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Let&apos;s talk &rarr;
            </a>
          </div>
          <div className="pricing-card pricing-card-featured">
            <div className="pricing-popular">Most common</div>
            <div className="pricing-tier">Standard</div>
            <div className="pricing-duration" style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}>3–5 weeks</div>
            <p className="pricing-desc">
              A full build cycle for web apps, multi-system integrations, or
              internal tools that need proper architecture and iteration.
            </p>
            <ul className="pricing-includes">
              <li>Scoping &amp; architecture</li>
              <li>Weekly demos &amp; iteration</li>
              <li>Deployment &amp; QA included</li>
            </ul>
            <a
              href="https://calendly.com/lucasmunro0402/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Let&apos;s talk &rarr;
            </a>
          </div>
          <div className="pricing-card">
            <div className="pricing-tier">Extended</div>
            <div className="pricing-duration" style={{ fontFamily: "var(--font-jetbrains-mono), monospace" }}>6–10+ weeks</div>
            <p className="pricing-desc">
              For larger products, mobile apps, or complex platforms that need
              multiple phases. We scope it in stages so you&apos;re never locked
              in.
            </p>
            <ul className="pricing-includes">
              <li>Phased delivery</li>
              <li>Ongoing support available</li>
              <li>Full ownership, no lock-in</li>
            </ul>
            <a
              href="https://calendly.com/lucasmunro0402/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Let&apos;s talk &rarr;
            </a>
          </div>
        </div>
      </div>

      <div className="section" id="about">
        <div className="about-section">
          <div className="about-grid">
            <div className="about-left">
              <div className="section-label">About</div>
              <h2>Luke Munro</h2>
              <div className="role">Founder, Helloship</div>
            </div>
            <div className="about-right">
              <p>
                I&apos;ve spent the last few years helping engineering teams at
                companies like the NFL, X, Etsy, and Roblox build and ship
                better products. Before that, I founded and built an ecommerce
                company from the ground up.
              </p>
              <p>
                Now I run Helloship — a small, fast studio that builds custom
                software, integrations, and automations for businesses that need
                the right solution, not a bigger team. You work directly with
                me, not a project manager.
              </p>
              <div className="client-list">
                <span className="client-tag">Full-stack development</span>
                <span className="client-tag">React Native</span>
                <span className="client-tag">AI agents &amp; automations</span>
                <span className="client-tag">System integrations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section" id="contact">
        <div className="cta-section">
          <div className="cta-inner">
            <h2>Let&apos;s solve it.</h2>
            <p>
              Tell us what your business needs. We&apos;ll get back to you
              within 24 hours with a plan.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-inner">
          <div className="footer-text">&copy; 2026 Helloship</div>
          <div className="footer-links">
            <a href="mailto:hello@helloship.ai">Contact</a>
          </div>
        </div>
      </footer>
    </>
  );
}
