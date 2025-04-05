
import React from 'react';
import { Button } from "@/components/ui/button";
import { Shield, Zap, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-safetyblue-500 mb-6">
            <span className="relative inline-block animate-float">
              Smart Protection
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 338 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5.26001C81 -0.339994 331.5 -1.30267 337 7.53732" stroke="#20C997" strokeWidth="2"/>
              </svg>
            </span>
            {" "}for Everyone
          </h1>
          
          <p className="max-w-2xl mx-auto mt-5 text-xl text-gray-600">
            A modern insurance platform where you can buy protection or earn by providing capital to insurance pools.
          </p>
          
          <div className="mt-8 flex justify-center space-x-4">
            <Button className="bg-safetyblue-500 hover:bg-safetyblue-600 text-white px-6 py-5 rounded-xl text-lg">
              Get Coverage
            </Button>
            <Button variant="outline" className="bg-white border-safetyblue-500 text-safetyblue-500 hover:bg-safetyblue-50 px-6 py-5 rounded-xl text-lg">
              Provide Capital
            </Button>
          </div>
        </div>
      </div>
      
      {/* Stats section */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg hover-scale overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-safetyblue-400 to-safetyblue-500"></div>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-safetyblue-50">
                  <Shield className="h-6 w-6 text-safetyblue-500" />
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-900">Reliable Coverage</h3>
              </div>
              <p className="text-gray-600">Protection against real-world events with instant claims processing and guaranteed payouts.</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover-scale overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-teal-400 to-teal-500"></div>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-teal-50">
                  <Zap className="h-6 w-6 text-teal-500" />
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-900">Capital Efficiency</h3>
              </div>
              <p className="text-gray-600">Optimize your funds by participating in diversified insurance pools with market-leading yields.</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg hover-scale overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-purple-400 to-purple-500"></div>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-purple-50">
                  <BarChart3 className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-900">Transparent Returns</h3>
              </div>
              <p className="text-gray-600">Track performance in real-time and earn competitive yields from unused premium reserves.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/2 -left-96 w-[500px] h-[500px] rounded-full bg-teal-200 mix-blend-multiply opacity-20 filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute top-1/3 -right-96 w-[600px] h-[600px] rounded-full bg-safetyblue-200 mix-blend-multiply opacity-20 filter blur-3xl animate-pulse-slow"></div>
    </div>
  );
};

export default Hero;
