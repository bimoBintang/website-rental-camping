"use client"
import { ArrowUpRight } from "lucide-react";
import React from "react";

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    trend?: string;
    trendUp?: boolean;
  }

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-xl font-bold mt-1">{value}</h3>
          {trend && (
            <div className={`flex items-center mt-2 text-xs ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
              {trendUp ? <ArrowUpRight size={12} /> : <ArrowUpRight size={12} className="rotate-180" />}
              <span className="ml-1">{trend}</span>
            </div>
          )}
        </div>
        <div className="p-2 bg-blue-50 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
);

export default StatCard;