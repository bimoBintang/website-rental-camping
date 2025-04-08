import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'small' | 'medium' | 'large';
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = 'Hello, I would like to inquire about your services.',
  position = 'bottom-right',
  size = 'medium',
}) => {
  // Formatting phone number (removing any non-digit characters)
  const formattedPhone = phoneNumber.replace(/\D/g, '');
  
  // Creating the WhatsApp API URL with phone number and pre-filled message
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
  
  // Determining size classes based on the size prop
  const sizeClasses = {
    small: 'w-12 h-12 text-xl',
    medium: 'w-16 h-16 text-2xl',
    large: 'w-20 h-20 text-3xl',
  };
  
  // Determining position classes based on the position prop
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        fixed ${positionClasses[position]} ${sizeClasses[size]}
        bg-green-500 hover:bg-green-600
        rounded-full flex items-center justify-center
        shadow-lg hover:shadow-xl
        transition-all duration-300 transform hover:scale-110
        z-50
      `}
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="text-white" />
    </a>
  );
};

export default WhatsAppButton;