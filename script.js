document.addEventListener("DOMContentLoaded", () => {
  // Menu hamburger functionality
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    document.querySelectorAll(".nav-link").forEach((n) =>
      n.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }),
    )
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetElement = document.querySelector(this.getAttribute("href"))
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })

  // Form submission
  const form = document.getElementById("contact-form")
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      // Here you would typically send the form data to a server
      // For this example, we'll just log it to the console
      const formData = new FormData(form)
      console.log("Form submitted with data:", Object.fromEntries(formData))
      alert("Mensagem enviada com sucesso!")
      form.reset()
    })
  }

  // Scroll animations
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  // Observer for fade-in animations
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-visible")
        fadeObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observer for slide-in animations
  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("slide-in-visible")
        slideObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observer for scale animations
  const scaleObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scale-in-visible")
        scaleObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Apply fade-in animation to section titles
  document.querySelectorAll("section h2").forEach((el) => {
    el.classList.add("fade-in")
    fadeObserver.observe(el)
  })

  // Apply slide-in animation to about content
  const aboutContent = document.querySelector(".about-content")
  if (aboutContent) {
    aboutContent.classList.add("slide-in-right")
    slideObserver.observe(aboutContent)
  }

  // Apply scale animation to service cards
  document.querySelectorAll(".service-card").forEach((el) => {
    el.classList.add("scale-in")
    scaleObserver.observe(el)
  })

  // Apply slide-in animation to project cards with staggered delay
  document.querySelectorAll(".project-card").forEach((el, index) => {
    el.classList.add("slide-in-up")
    el.style.transitionDelay = `${index * 0.1}s`
    slideObserver.observe(el)
  })

  // Apply fade-in animation to contact form
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.classList.add("fade-in")
    fadeObserver.observe(contactForm)
  }

  // Parallax effect for hero section
  const hero = document.querySelector(".hero")
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      if (scrollPosition < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`

        // Move hero content in opposite direction for parallax effect
        const heroContent = hero.querySelector(".container")
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`
          heroContent.style.opacity = 1 - scrollPosition / (window.innerHeight * 0.8)
        }
      }
    })
  }

  // Typing animation for hero title
  const heroTitle = document.querySelector(".hero h1")
  if (heroTitle) {
    const text = heroTitle.textContent
    heroTitle.textContent = ""

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    setTimeout(typeWriter, 500)
  }

  // Animated scroll indicator
  const createScrollIndicator = () => {
    const indicator = document.createElement("div")
    indicator.className = "scroll-indicator"
    indicator.innerHTML = `
              <div class="mouse">
                  <div class="wheel"></div>
              </div>
              <div class="arrow">
                  <span></span>
                  <span></span>
                  <span></span>
              </div>
          `

    const hero = document.querySelector(".hero")
    if (hero) {
      hero.appendChild(indicator)

      // Hide indicator on scroll
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          indicator.style.opacity = "0"
        } else {
          indicator.style.opacity = "1"
        }
      })
    }
  }

  createScrollIndicator()

  // Animated background gradient
  const animateGradient = () => {
    const colors = ["rgba(0,123,255,0.7)", "rgba(0,86,179,0.7)", "rgba(25,135,255,0.7)", "rgba(0,105,217,0.7)"]

    let currentIndex = 0

    setInterval(() => {
      currentIndex = (currentIndex + 1) % colors.length
      const nextIndex = (currentIndex + 1) % colors.length

      document.documentElement.style.setProperty("--gradient-color-1", colors[currentIndex])
      document.documentElement.style.setProperty("--gradient-color-2", colors[nextIndex])
    }, 5000)
  }

  animateGradient()

  // Header scroll effect
  const header = document.getElementById("header")
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top")
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        backToTopButton.classList.add("active")
      } else {
        backToTopButton.classList.remove("active")
      }
    })
  }

  // Testimonial slider
  const testimonialSlider = () => {
    const dots = document.querySelectorAll(".dot")
    const prevBtn = document.querySelector(".prev-btn")
    const nextBtn = document.querySelector(".next-btn")
    const testimonials = document.querySelectorAll(".testimonial-card")

    if (!dots.length || !prevBtn || !nextBtn || !testimonials.length) return

    let currentIndex = 0

    const showTestimonial = (index) => {
      testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle("active", i === index)
      })

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index)
      })
    }

    // Initialize
    showTestimonial(currentIndex)

    // Event listeners
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
      showTestimonial(currentIndex)
    })

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % testimonials.length
      showTestimonial(currentIndex)
    })

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        currentIndex = i
        showTestimonial(currentIndex)
      })
    })

    // Auto slide
    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length
      showTestimonial(currentIndex)
    }, 5000)
  }

  testimonialSlider()
})

