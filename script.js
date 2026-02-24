
// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Adjusts the viewport area considered for intersection
};

// Create observer instance to watch for elements entering viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add 'visible' class to trigger animations when element comes into view
            entry.target.classList.add('visible');
            // Stop observing after animation triggers to improve performance
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all section elements for scroll-triggered animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
// Smooth scrolling for anchor links with focus management
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default jump behavior
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Smooth scroll to target element with offset for fixed navbar
            window.scrollTo({
                top: targetElement.offsetTop - 80, // 80px offset for navbar height
                behavior: 'smooth' // Enable smooth scrolling
            });
            
            // Add focus to the target section for keyboard users after scroll completes
            setTimeout(() => {
                targetElement.setAttribute('tabindex', '-1'); // Make focusable
                targetElement.focus(); // Set focus for keyboard navigation
            }, 1000); // Delay to allow scroll to complete
        }
    });
});
// Add keyboard focus styles to interactive elements
document.addEventListener('keyup', (e) => {
    if (e.key === 'Tab') { // Only apply when tabbing through elements
        const activeElement = document.activeElement; // Get currently focused element
        
        // Add special focus styles for keyboard navigation to specific elements
        if (activeElement.classList.contains('nav-link') || 
            activeElement.classList.contains('max-w-4xl') ||
            activeElement.classList.contains('bg-gray-800/50')) {
            // Apply visual feedback for keyboard users
            activeElement.style.transform = 'translateY(-5px) scale(1.05)';
            activeElement.style.boxShadow = '0 10px 20px -5px rgba(124, 58, 237, 0.3)';
            activeElement.style.transition = 'all 0.3s ease'; // Smooth transition
        }
    }
});
// Remove focus styles when mouse is used
document.addEventListener('mousemove', () => {
    const focusedElements = document.querySelectorAll(':focus'); // Get all focused elements
    focusedElements.forEach(el => {
        // Reset styles for elements that had keyboard focus styles
        if (el.classList.contains('nav-link') || 
            el.classList.contains('max-w-4xl') ||
            el.classList.contains('bg-gray-800/50')) {
            el.style.transform = ''; // Reset transform
            el.style.boxShadow = ''; // Reset shadow
        }
    });
});
// Create 3D floating elements using Three.js
const floatingContainer = document.getElementById('floating-elements');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
floatingContainer.appendChild(renderer.domElement);

// Create floating objects
const objects = [];
const geometryTypes = [
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.SphereGeometry(0.8, 16, 16),
    new THREE.ConeGeometry(0.8, 1.5, 16),
    new THREE.TorusGeometry(0.6, 0.2, 16, 32),
    new THREE.OctahedronGeometry(0.8)
];

const colors = [
    0x7e22ce, 0x9333ea, 0xa855f7, 0xc084fc, 0xd8b4fe
];

for (let i = 0; i < 15; i++) {
    const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
    const material = new THREE.MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        transparent: true,
        opacity: 0.3,
        wireframe: true
    });
    const object = new THREE.Mesh(geometry, material);
    
    // Random position
    object.position.x = Math.random() * 20 - 10;
    object.position.y = Math.random() * 20 - 10;
    object.position.z = Math.random() * 20 - 10;
    
    // Random rotation speed
    object.userData = {
        rotationSpeed: {
            x: Math.random() * 0.01,
            y: Math.random() * 0.01,
            z: Math.random() * 0.01
        },
        moveSpeed: {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01
        }
    };
    
    scene.add(object);
    objects.push(object);
}

camera.position.z = 15;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    objects.forEach(object => {
        object.rotation.x += object.userData.rotationSpeed.x;
        object.rotation.y += object.userData.rotationSpeed.y;
        object.rotation.z += object.userData.rotationSpeed.z;
        
        object.position.x += object.userData.moveSpeed.x;
        object.position.y += object.userData.moveSpeed.y;
        object.position.z += object.userData.moveSpeed.z;
        
        // Boundary check
        if (Math.abs(object.position.x) > 15) object.userData.moveSpeed.x *= -1;
        if (Math.abs(object.position.y) > 15) object.userData.moveSpeed.y *= -1;
        if (Math.abs(object.position.z) > 15) object.userData.moveSpeed.z *= -1;
    });
    
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
// Form submission handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}