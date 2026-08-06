import { supabaseClient } from '../services/supabase';

// Mock Data
const mockDoctor = {
  id: 'doc-123',
  first_name: 'Ahmad',
  last_name: 'Khalil',
  specialty: 'Dermatology',
  avatar_url: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};

const mockPatient = {
  id: 'pat-123',
  first_name: 'Omar',
  last_name: 'Safarini',
  avatar_url: 'https://i.pravatar.cc/150?u=a042581f4e29026704c',
};

const mockPosts = [
  {
    id: 'post-1',
    patient_id: 'pat-123',
    title: 'Skin Rash Issue',
    description: 'I have a red skin rash on my left arm that started 2 days ago.',
    timestamp: new Date().toISOString(),
    status: 'open',
    patient: mockPatient,
  },
  {
    id: 'post-2',
    patient_id: 'pat-123',
    title: 'Checkup for previous condition',
    description: 'Follow up on the treatment prescribed last month.',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    status: 'closed',
    patient: mockPatient,
  }
];

const mockReplies = [
  {
    id: 'reply-1',
    post_id: 'post-1',
    doctor_id: 'doc-123',
    content: 'Please apply the prescribed ointment twice a day.',
    timestamp: new Date().toISOString(),
    doctor: mockDoctor,
  }
];

// Configure the mock adapter
export const enableMocks = () => {
  console.log('🌐 Web Mock Mode Enabled: Intercepting Supabase requests');
  
  supabaseClient.defaults.adapter = async (config) => {
    // Fake network delay (500ms to 1000ms)
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));

    const url = config.url || '';
    const method = config.method?.toLowerCase() || 'get';

    console.log(`[MOCK] ${method.toUpperCase()} ${url}`);

    let data: any = [];

    if (method === 'get') {
      if (url.includes('/doctor')) {
        data = [mockDoctor];
      } else if (url.includes('/patient')) {
        data = [mockPatient];
      } else if (url.includes('/post') || url.includes('/case')) {
        data = mockPosts;
      } else if (url.includes('/reply') || url.includes('/comment')) {
        data = mockReplies;
      }
    } else if (method === 'post') {
      // Mock successful creation
      data = [{ id: 'new-id-' + Math.random(), ...JSON.parse(config.data || '{}') }];
    } else if (method === 'patch' || method === 'put') {
      data = [{ ...JSON.parse(config.data || '{}') }];
    } else if (method === 'delete') {
      data = [];
    }

    return {
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
      request: {}
    };
  };
};
