"use client";
import { useState } from "react";
import { Tooltip } from 'react-tooltip';
import Image from "next/image";

interface TeamCardProps {
  title: string;
  name: string;
  description: string;
  image: string;
  phone: string;
  mail: string;
  protectionMessage: string;
}

export default function TeamCard({ title, name, description, image, phone, mail, protectionMessage }: TeamCardProps) {
  const [showFullContact, setShowFullContact] = useState(false);

  const toggleContact = () => {
    setShowFullContact(!showFullContact);
  };

  const maskEmail = (email: string) => {
    const [local, domain] = email.split('@');
    return `${local.substring(0, 2)}...@${domain}`;
  };

  const maskPhone = (phone: string) => {
    return `${phone.substring(0, 7)}...`;
  };

  return (
    <div className="relative">
      <div className="relative aspect-square">
        <Image src={image} alt={name} fill className="object-cover transition-all duration-300" />
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-white">
          {name}
        </h3>
        <p className="text-neutral-200 leading-relaxed italic mb-4">
          {title}
        </p>
        <p className="text-neutral-400 leading-relaxed mb-4">
          {description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-neutral-300">
            <span className="font-medium mr-2">Tel: </span>
            {showFullContact ? (
              <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                {phone}
              </a>
            ) : (
              <button 
                onClick={toggleContact}
                className="hover:text-white transition-colors cursor-pointer"
                data-tooltip-id="contact-tooltip"
                data-tooltip-content={protectionMessage}
              >
                {maskPhone(phone)}
              </button>
            )}
          </div>
          
          <div className="flex items-center text-sm text-neutral-300">
            <span className="font-medium mr-2">Mail: </span>
            {showFullContact ? (
              <a href={`mailto:${mail}`} className="hover:text-white transition-colors">
                {mail}
              </a>
            ) : (
              <button 
                onClick={toggleContact}
                className="hover:text-white transition-colors cursor-pointer"
                data-tooltip-id="contact-tooltip"
                data-tooltip-content={protectionMessage}
              >
                {maskEmail(mail)}
              </button>
            )}
          </div>
        </div>
      </div>

      <Tooltip 
        id="contact-tooltip" 
        place="top"
        style={{
          backgroundColor: '#1f2937',
          color: '#f3f4f6',
          borderRadius: '6px',
          fontSize: '12px'
        }}
      />
    </div>
  );
}
