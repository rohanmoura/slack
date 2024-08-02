'use client';

import { supaBaseBrowserClients } from '@/supabase/supabaseClient';
import { useEffect, useState } from 'react';


export const useChatFile = (filePath: string) => {
  const [publicUrl, setPublicUrl] = useState('');
  const [fileType, setFileType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const supabase = supaBaseBrowserClients;

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const {
          data: { publicUrl },
        } = await supabase.storage.from('Slack').getPublicUrl(filePath);

        if (publicUrl) {
          setPublicUrl(publicUrl);

          if (filePath.startsWith('chat/img-')) {
            setFileType('image');
          } else if (filePath.startsWith('chat/pdf-')) {
            setFileType('pdf');
          }
        }
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (filePath) {
      fetchFile();
    }
  }, [filePath, supabase.storage]);

  return { publicUrl, fileType, loading, error };
};