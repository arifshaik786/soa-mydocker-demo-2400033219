import { useCallback, useEffect, useState } from 'react';
import { deleteSession, getAllSessions } from '../services/sessionService';

export default function useSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllSessions();
      if (!Array.isArray(data)) throw new Error('The server returned an unexpected sessions format.');
      setSessions(data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id) => {
    await deleteSession(id);
    await refresh();
  }, [refresh]);

  useEffect(() => { refresh(); }, [refresh]);
  return { sessions, loading, error, refresh, remove };
}
