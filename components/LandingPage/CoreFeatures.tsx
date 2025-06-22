"use client";

import Link from 'next/link';
import {
  Briefcase,
  GraduationCap,
  Key,
  BookOpen,
  CreditCard,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const sections = [
  {
    id: 'latest-jobs',
    title: 'Latest Jobs',
    description: 'Real-time job updates from all major government organizations including UPSC, SSC, Railways, Banking, and State PSCs. Get instant notifications for new openings.',
    icon: Briefcase,
    color: 'bg-blue-500',
    features: ['Real-time updates', 'AI-powered categorization',],
    stats: '100+ New Jobs This Month',
    href: '/jobs'
  },
  {
    id: 'results',
    title: 'Results',
    description: 'Comprehensive results database with detailed analysis. Track your application status and get insights on selection trends and cutoff patterns.',
    icon: TrendingUp,
    color: 'bg-green-500',
    features: ['Instant result alerts', 'Cutoff analysis'],
    stats: '1000+ Results Updated',
    href: '/result'
  },
  {
    id: 'admissions',
    title: 'Admissions',
    description: 'Complete admission information for government colleges, universities, and professional courses. From application to enrollment guidance.',
    icon: GraduationCap,
    color: 'bg-purple-500',
    features: ['College finder', 'Eligibility checker'],
    stats: '200+ Institutions Listed',
    href: '/admission'
  },
  {
    id: 'answer-keys',
    title: 'Answer Keys',
    description: 'Official and provisional answer keys for all major competitive exams. Compare your responses and estimate your scores instantly.',
    icon: Key,
    color: 'bg-orange-500',
    features: ['Instant key updates', 'Score calculator'],
    stats: '50+ Keys This Month',
    href: '/answer-key'
  },
  {
    id: 'syllabus',
    title: 'Syllabus',
    description: 'Detailed syllabus and exam patterns for all government exams. AI-generated study plans and topic-wise preparation strategies.',
    icon: BookOpen,
    color: 'bg-indigo-500',
    features: ['Smart study plans', 'Topic prioritization'],
    stats: '100+ Exams Covered',
    href: '/syllabus'
  },
  {
    id: 'admit-cards',
    title: 'Admit Cards',
    description: 'Download hall tickets and admit cards for various government exams. Get timely reminders and important exam instructions.',
    icon: CreditCard,
    color: 'bg-red-500',
    features: ['Quick downloads', 'Important updates'],
    stats: '75+ Cards Available',
    href: '/admit-card'
  }
];

export default function CoreFeatures() {
  return (
    <div>
        <div className="text-center mb-12">
          <p>
            Everything you need for your government job preparation journey,
            powered by AI and updated in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Link key={section.id} href={section.href} className="block">
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg cursor-pointer h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-lg ${section.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {section.stats}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-blue-500 transition-colors">
                      {section.title}
                    </CardTitle>
                    <CardDescription className="leading-relaxed">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      {section.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm font-light">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button className="w-full group-hover:bg-blue-400 transition-colors">
                      Explore {section.title}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
    </div>
  )
}