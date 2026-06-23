import React, { useState, useRef, MouseEvent } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  onClick?: () => void;
  maxTilt?: number; // max tilt degrees
  key?: React.Key;
}

export function TiltCard({ children, className = '', id, onClick, maxTilt = 10 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [reflectionStyle, setReflectionStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Normalize coordinates (-0.5 to 0.5)
    const normalizedX = mouseX / width;
    const normalizedY = mouseY / height;

    // Calculate rotation angles
    const rotateX = -normalizedY * maxTilt;
    const rotateY = normalizedX * maxTilt;

    // Apply 3D perspective rotation style
    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);

    // Calculate dynamic reflection/glare angle and intensity
    const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    const maxDistance = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);
    const intensity = (distance / maxDistance) * 0.45;

    setReflectionStyle({
      background: `linear-gradient(${angle + 90}deg, rgba(255, 255, 255, ${intensity}) 0%, rgba(255, 255, 255, 0) 70%)`,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    // Reset to base state with smooth animation
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setReflectionStyle({
      opacity: 0,
      transition: 'opacity 0.5s ease, background 0.5s ease',
    });
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
      className={`relative rounded-3xl glass-panel glass-panel-hover overflow-hidden select-none cursor-pointer ${className}`}
    >
      {/* Glare/Reflection Overlay Layer */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          ...reflectionStyle,
        }}
      />
      {children}
    </div>
  );
}
