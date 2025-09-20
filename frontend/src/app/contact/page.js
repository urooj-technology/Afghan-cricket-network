'use client'

import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import { useLanguage } from '../../contexts/LanguageContext'
import { getTranslation } from '../../lib/translations'
import { useState } from 'react'
import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'

export default function Contact() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getTranslation(language, 'contact.title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {getTranslation(language, 'contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {getTranslation(language, 'contact.form.title') || 'Send us a Message'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {getTranslation(language, 'contact.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={getTranslation(language, 'contact.form.namePlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {getTranslation(language, 'contact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={getTranslation(language, 'contact.form.emailPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    {getTranslation(language, 'contact.form.subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={getTranslation(language, 'contact.form.subjectPlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {getTranslation(language, 'contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={getTranslation(language, 'contact.form.messagePlaceholder')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
                >
                  {getTranslation(language, 'contact.form.send')}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {getTranslation(language, 'contact.contactInfo')}
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  {getTranslation(language, 'contact.description') || 'We\'d love to hear from you. Get in touch with us for any inquiries about Afghan Cricket Network.'}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {getTranslation(language, 'contact.info.address')}
                    </h3>
                    <p className="text-gray-600">
                      {getTranslation(language, 'contact.addressText') || 'Kabul, Afghanistan'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <PhoneIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {getTranslation(language, 'contact.info.phone')}
                    </h3>
                    <p className="text-gray-600">
                      {getTranslation(language, 'contact.phoneText') || '+93 70 123 4567'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <EnvelopeIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {getTranslation(language, 'contact.info.email')}
                    </h3>
                    <p className="text-gray-600">
                      {getTranslation(language, 'contact.emailText') || 'info@afghancricketnetwork.com'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <ClockIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {getTranslation(language, 'contact.info.officeHours')}
                    </h3>
                    <p className="text-gray-600">
                      {getTranslation(language, 'contact.officeHoursText')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  {getTranslation(language, 'contact.emergency.title') || 'Emergency Contact'}
                </h3>
                <p className="text-blue-800 text-sm mb-3">
                  {getTranslation(language, 'contact.emergency.description') || 'For urgent matters outside office hours'}
                </p>
                <p className="text-blue-900 font-semibold">
                  {getTranslation(language, 'contact.emergency.phone') || '+93 70 999 9999'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {getTranslation(language, 'contact.location.title') || 'Find Us'}
            </h2>
            <p className="text-lg text-gray-600">
              {getTranslation(language, 'contact.location.description') || 'Visit our office in Kabul'}
            </p>
          </div>
          
          <div className="bg-gray-200 h-96 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPinIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {getTranslation(language, 'contact.map.placeholder') || 'Interactive map will be displayed here'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
