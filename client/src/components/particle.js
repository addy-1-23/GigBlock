import React, { useRef, useEffect } from "react";



const ParticlesCanvas = () => {

  const canvasRef = useRef(null);

  const particles = useRef([]);

  const mouse = useRef({ x: null, y: null });

  const particleCount = 900;



  useEffect(() => {

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);

    let height = (canvas.height = window.innerHeight);



    // Generate particles

    const initializeParticles = () => {

      particles.current = Array.from({ length: particleCount }, () => ({

        x: Math.random() * width,

        y: Math.random() * height,

        size: Math.random() * 1.5 + 1,

        dx: (Math.random() - 0.5) * 0.5, // Slow movement

        dy: (Math.random() - 0.5) * 0.5, // Slow movement

      }));

    };



    initializeParticles();



    // Draw particles

    const drawParticles = () => {

      particles.current.forEach((particle) => {

        ctx.beginPath();

        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(8, 122, 245, 0.59)";

        ctx.fill();

      });

    };



    // Draw connecting lines

    const drawLines = () => {

      particles.current.forEach((p1) => {

        particles.current.forEach((p2) => {

          const distance = Math.sqrt(

            (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2

          );

          if (distance < 90) {

            ctx.beginPath();

            ctx.moveTo(p1.x, p1.y);

            ctx.lineTo(p2.x, p2.y);

            ctx.strokeStyle = "rgba(132, 0, 255, 0.06)";

            ctx.lineWidth = 1;

            ctx.stroke();

          }

        });



        // Draw lines to the mouse

        if (mouse.current.x !== null) {

          const distanceToMouse = Math.sqrt(

            (p1.x - mouse.current.x) ** 2 +

              (p1.y - mouse.current.y) ** 2

          );

          if (distanceToMouse < 150) {

            ctx.beginPath();

            ctx.moveTo(p1.x, p1.y);

            ctx.lineTo(mouse.current.x, mouse.current.y);

            ctx.strokeStyle = "rgba(132, 0, 255, 0.38)";

            ctx.lineWidth = 1;

            ctx.stroke();

          }

        }

      });

    };



    // Update particle positions

    const updateParticles = () => {

      particles.current.forEach((particle) => {

        particle.x += particle.dx;

        particle.y += particle.dy;



        // Bounce off edges

        if (particle.x < 0 || particle.x > width) particle.dx *= -1;

        if (particle.y < 0 || particle.y > height) particle.dy *= -1;



        // Hover effect: Subtle attraction to mouse

        const distanceToMouse = Math.sqrt(

          (particle.x - mouse.current.x) ** 2 +

            (particle.y - mouse.current.y) ** 2

        );



        if (distanceToMouse < 150 && mouse.current.x !== null) {

          const angle = Math.atan2(

            mouse.current.y - particle.y,

            mouse.current.x - particle.x

          );

          particle.x += Math.cos(angle) * 0.5; // Subtle movement

          particle.y += Math.sin(angle) * 0.5;

        }

      });

    };



    // Animation loop

    const animate = () => {

      ctx.clearRect(0, 0, width, height);

      drawParticles();

      drawLines();

      updateParticles();

      requestAnimationFrame(animate);

    };



    // Mouse event listeners

    const handleMouseMove = (e) => {

      mouse.current.x = e.clientX;

      mouse.current.y = e.clientY;

    };



    const handleMouseOut = () => {

      mouse.current.x = null;

      mouse.current.y = null;

    };



    const handleResize = () => {

      width = canvas.width = window.innerWidth;

      height = canvas.height = window.innerHeight;

      initializeParticles(); // Reinitialize particles on resize

    };



    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener("mouseout", handleMouseOut);

    window.addEventListener("resize", handleResize);



    animate();



    return () => {

      window.removeEventListener("mousemove", handleMouseMove);

      window.removeEventListener("mouseout", handleMouseOut);

      window.removeEventListener("resize", handleResize);

    };

  }, []);



  return (

    <canvas

      ref={canvasRef}

      style={{

        position: "absolute",

        top: 0,

        left: 0,

        width: "100%",

        height: "100%",

        zIndex: -1,

      }}

    />

  );

};



export default ParticlesCanvas;