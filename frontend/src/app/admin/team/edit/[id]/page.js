'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import AdminLayout from '../../../../../components/admin/AdminLayout'
import CrudForm from '../../../../../components/admin/CrudForm'
import { useFetchData } from '../../../../../hooks'

export default function EditTeamMember() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const { id } = params
  const type = searchParams.get('type') || 'player'

  const { data: roles } = useFetchData('/team-roles')

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      router.push('/admin')
    }
  }, [router])

  const playerFields = [
    // Basic Information
    {
      name: 'name',
      label: 'Player Name',
      type: 'text',
      required: true,
      placeholder: 'Enter player full name'
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      placeholder: 'player-name-slug'
    },
    {
      name: 'jersey_number',
      label: 'Jersey Number',
      type: 'number',
      min: 1,
      max: 999,
      placeholder: 'Jersey number (1-999)'
    },
    {
      name: 'photo',\n      label: 'Player Photo',
      type: 'file',
      accept: 'image/*',
      help: 'Upload player headshot (recommended: 400x400px)'
    },
    
    // Role & Position
    {
      name: 'role',
      label: 'Player Role',
      type: 'select',
      required: true,
      options: [
        { value: 'batsman', label: 'Batsman' },
        { value: 'bowler', label: 'Bowler' },
        { value: 'all-rounder', label: 'All-rounder' },
        { value: 'wicket-keeper', label: 'Wicket-keeper' }
      ]
    },
    {
      name: 'position',
      label: 'Playing Position',
      type: 'text',
      placeholder: 'e.g., Opening Batsman, Fast Bowler'
    },
    
    // Personal Details
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      required: true,
      min: 16,
      max: 50
    },
    {
      name: 'date_of_birth',
      label: 'Date of Birth',
      type: 'date'
    },
    {
      name: 'bio',
      label: 'Player Biography',
      type: 'textarea',
      rows: 6,
      placeholder: 'Write about player background, achievements, playing style...',
      fullWidth: true
    },
    
    // Career Statistics
    {
      name: 'matches_played',
      label: 'Matches Played',
      type: 'number',
      defaultValue: 0,
      min: 0
    },
    {
      name: 'runs_scored',
      label: 'Total Runs',
      type: 'number',
      defaultValue: 0,
      min: 0
    },
    {
      name: 'wickets_taken',
      label: 'Total Wickets',
      type: 'number',
      defaultValue: 0,
      min: 0
    },
    {
      name: 'batting_average',
      label: 'Batting Average',
      type: 'number',
      defaultValue: 0,
      min: 0,
      step: 0.01
    },
    {
      name: 'bowling_average',
      label: 'Bowling Average',
      type: 'number',
      defaultValue: 0,
      min: 0,
      step: 0.01
    },
    {
      name: 'strike_rate',
      label: 'Strike Rate',
      type: 'number',
      defaultValue: 0,
      min: 0,
      step: 0.01
    },
    
    // Career Dates
    {
      name: 'debut_date',
      label: 'Debut Date',
      type: 'date',
      help: 'Date of first professional match'
    },
    {
      name: 'join_date',
      label: 'Team Join Date',
      type: 'date',
      required: true
    },
    
    // Status & Features
    {
      name: 'status',
      label: 'Player Status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { value: 'active', label: 'Active - Available for selection' },
        { value: 'injured', label: 'Injured - Currently injured' },
        { value: 'retired', label: 'Retired - No longer playing' },
        { value: 'suspended', label: 'Suspended - Temporarily unavailable' }
      ]
    },
    {
      name: 'is_captain',
      label: 'Team Captain',
      type: 'checkbox'
    },
    {
      name: 'is_vice_captain',
      label: 'Vice Captain',
      type: 'checkbox'
    },
    {
      name: 'is_featured',
      label: 'Featured Player',
      type: 'checkbox',
      help: 'Featured players appear on homepage'
    }
  ]

  const memberFields = [
    // Basic Information
    {
      name: 'name',
      label: 'Member Name',
      type: 'text',
      required: true,
      placeholder: 'Enter full name'
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      required: true,
      placeholder: 'member-name-slug'
    },
    {
      name: 'position',
      label: 'Job Position/Title',
      type: 'text',
      required: true,
      placeholder: 'e.g., Head Coach, Team Manager'
    },
    {
      name: 'member_type',
      label: 'Member Type',
      type: 'select',
      required: true,
      options: [
        { value: 'management', label: 'Management Team' },
        { value: 'coaches', label: 'Coaching Staff' },
        { value: 'staff', label: 'Support Staff' },
        { value: 'players', label: 'Players' }
      ]
    },
    {
      name: 'role',
      label: 'Team Role',
      type: 'select',
      options: roles?.results?.map(role => ({
        value: role.id,
        label: role.name
      })) || []
    },
    
    // Personal Details
    {
      name: 'bio',
      label: 'Biography',
      type: 'textarea',
      rows: 6,
      placeholder: 'Write about experience, qualifications, achievements...',
      fullWidth: true
    },
    {
      name: 'photo',
      label: 'Profile Photo',
      type: 'file',
      accept: 'image/*'
    },
    
    // Contact Information
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'member@example.com'
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      placeholder: '+93 xxx xxx xxx'
    },
    
    // Status & Organization
    {
      name: 'join_date',
      label: 'Join Date',
      type: 'date',
      required: true
    },
    {
      name: 'is_active',
      label: 'Active Member',
      type: 'checkbox',
      defaultValue: true
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
      defaultValue: 0,
      min: 0,
      help: 'Lower numbers appear first in listings'
    }
  ]

  return (
    <AdminLayout title={`Edit ${type === 'player' ? 'Player' : 'Team Member'}`}>
      <CrudForm
        endpoint={type === 'player' ? '/players/' : '/team-members/'}
        fields={type === 'player' ? playerFields : memberFields}
        title={type === 'player' ? 'Player' : 'Team Member'}
        backPath="/admin/team/"
        itemId={id}
      />
    </AdminLayout>
  )
}