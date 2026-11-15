const { useEffect, useLayoutEffect, useRef, useState } = React;

const RESUME_FILENAME = 'Subin_Ratna_Tuladhar_Professional_CV.pdf';
const STATS_ENDPOINT = '/.netlify/functions/portfolio-stats';
const RESUME_ENDPOINT = '/.netlify/functions/resume-download';

function getVisitorId() {
  const storageKey = 'portfolio-visitor-id';
  let visitorId = window.localStorage.getItem(storageKey);

  if (!visitorId) {
    visitorId = window.crypto.randomUUID();
    window.localStorage.setItem(storageKey, visitorId);
  }

  return visitorId;
}

async function fetchPortfolioStats(visitorId) {
  const response = await fetch(`${STATS_ENDPOINT}?visitorId=${encodeURIComponent(visitorId)}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Could not load portfolio stats.');
  }

  return data;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const projects = [
  {
    name: 'Financial Platform UI/UX',
    org: 'Digihub',
    role: 'UI/UX Designer',
    type: 'Stock Market • TMS • PMS',
    summary:
      'A multi-layered investment and trading platform designed for complex data workflows, responsive decision-making, and high-trust financial experiences.',
    points: [
      'Translated business and analyst requirements into clear user flows, information architecture, and high-fidelity interfaces.',
      'Designed dashboards and workflows for stock market, trading management, and portfolio management systems used by active users.',
      'Balanced complex data density with usability, visual clarity, and responsive interactions across desktop and mobile experiences.',
    ],
    theme: 'financial',
    labels: ['Trading', 'Portfolio', 'Data visualisation'],
  },
  {
    name: 'E-commerce Website',
    org: 'Render Education Consultancy',
    role: 'Project Manager & UI/UX Designer',
    type: 'Catalogue • Cart • Checkout',
    summary:
      'A client-facing digital storefront designed to simplify browsing, selection, and check-out while keeping the project aligned across design and development.',
    points: [
      'Led the design and project coordination for a complete online commerce experience, including product browsing, cart and checkout flows.',
      'Created reusable UI patterns and wireframes that supported both stakeholder clarity and smooth frontend implementation.',
      'Facilitated communication between the client, design decisions, and development tasks to keep delivery on schedule.',
    ],
    theme: 'commerce',
    labels: ['E-commerce', 'UX flows', 'Coordination'],
  },
  {
    name: 'Chiva Chaitya',
    link: 'https://chivachaitya.org.np/',
    image: 'assets/chiva-chaitya.png',
    org: 'Cultural Heritage Platform',
    role: 'UX/UI Designer',
    type: 'Research • Design • Iteration',
    summary:
      'A heritage-focused platform exploring how cultural storytelling and digital interaction can create a more engaging and informative public experience.',
    points: [
      'Applied user research, persona-informed thinking, and iterative design improvements to shape a meaningful cultural experience.',
      'Focused on content hierarchy, discoverability, and accessibility so heritage stories remain clear, approachable, and engaging.',
      'Created a design direction that balanced editorial storytelling with practical usability and responsive presentation.',
    ],
    theme: 'heritage',
    labels: ['Research', 'Heritage', 'Iterative design'],
  },
];

const experience = [
  {
    role: 'Software Engineer Intern',
    company: 'RightFind Professionals',
    date: 'June 2025 – October 2025',
    bullets: [
      'Worked on Java-based development with focus on core programming, object-oriented design, and practical software engineering fundamentals.',
      'Implemented efficient algorithms, data structures, and maintainable application logic to support real business problem solving.',
      'Collaborated with senior engineers through code reviews and pair programming, strengthening enterprise development practices.',
    ],
  },
  {
    role: 'Programme Officer',
    company: 'Chiva Chaitya Organisation',
    date: 'October 2024 – June 2025',
    bullets: [
      'Managed organisational programmes and coordinated cross-functional initiatives to support strategic objectives and effective delivery.',
      'Used analytical and problem-solving approaches to improve workflows, communication, and overall operational effectiveness.',
      'Supported stakeholder engagement and communication planning to strengthen organisational impact and project alignment.',
    ],
  },
  {
    role: 'UI/UX Designer',
    company: 'Digihub',
    date: 'September 2023 – July 2024',
    bullets: [
      'Designed user-centric interfaces for live financial platforms including stock market dashboards, TMS, and PMS tools used by active users.',
      'Worked closely with business analysts to convert complex requirements into intuitive solutions with market-facing usability.',
      'Created wireframes, prototypes, and high-fidelity mockups in Figma, using iterative review cycles and responsive design principles.',
    ],
  },
  {
    role: 'Project Manager & UI/UX Designer (Freelance)',
    company: 'Render Education Consultancy',
    date: 'November 2023 – December 2023',
    bullets: [
      'Led the end-to-end design and project management for an e-commerce website, coordinating between client stakeholders and developers.',
      'Designed user flows, UI components, and wireframes to support a functional storefront delivered on time.',
      'Facilitated daily stand-ups and sprint planning to keep design, frontend, and backend work aligned and clear.',
    ],
  },
  {
    role: 'UI/UX Designer Intern',
    company: 'Peace Nepal DOT Com',
    date: 'May 2023 – September 2023',
    bullets: [
      'Applied user-centred design methods including wireframing, prototyping, and usability testing to real-world digital projects.',
      'Conducted user research and developed early personas to inform product decisions and improve engagement.',
      'Collaborated with mentors to refine design process, information structure, and industry-aligned digital communication.',
    ],
  },
];

const skillGroups = [
  {
    title: 'Design',
    icon: 'design',
    skills: ['UI/UX Design', 'Wireframing', 'Prototyping', 'User Research', 'Usability Testing', 'Design Systems', 'Information Architecture', 'Interaction Design', 'Responsive Design'],
  },
  {
    title: 'Tools',
    icon: 'tools',
    skills: ['Figma', 'Adobe Illustrator'],
  },
  {
    title: 'Development',
    icon: 'development',
    skills: ['HTML', 'CSS', 'JavaScript', 'Java', 'MySQL'],
  },
  {
    title: 'Professional',
    icon: 'people',
    skills: ['Project Coordination', 'Stakeholder Communication', 'Cross-functional Collaboration', 'Problem Solving'],
  },
];

function CapabilityIcon({ name }) {
  const paths = {
    design: (
      <>
        <path d="m14.7 6.3 3 3" />
        <path d="m4 20 4.2-1 10.1-10.1a2.1 2.1 0 0 0-3-3L5.2 16 4 20Z" />
        <path d="M12 20h8" />
      </>
    ),
    tools: (
      <>
        <path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L3.8 17.2a2.1 2.1 0 0 0 3 3l4.5-4.5a5 5 0 0 0 6.4-6.4L14.5 12l-2.8-2.8 3-2.9Z" />
        <path d="m16.5 16.5 3 3" />
      </>
    ),
    development: (
      <>
        <path d="m8 7-5 5 5 5" />
        <path d="m16 7 5 5-5 5" />
        <path d="m14 4-4 16" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 20v-1.5a5.5 5.5 0 0 1 11 0V20" />
        <path d="M16 5.5a3 3 0 0 1 0 5.8M17 14a5 5 0 0 1 3.5 4.8V20" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function ContactIcon({ name }) {
  const icons = {
    email: <path d="M3 6.5 12 13l9-6.5M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />,
    linkedin: (
      <>
        <path d="M8 10v7M8 7v.01M12 17v-4a3 3 0 0 1 6 0v4" />
        <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      </>
    ),
    github: (
      <>
        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.4-3.8 1.4a13.2 13.2 0 0 0-6.9 0C5.5 1.2 4.3 1.6 4.3 1.6a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7A3.4 3.4 0 0 0 8 18.1V22" />
      </>
    ),
    behance: <path d="M3 6h7a3 3 0 0 1 0 6H3V6Zm0 6h8a3.5 3.5 0 0 1 0 7H3v-7Zm12-5h6m-7 8h8a4 4 0 1 0-8 0 4 4 0 0 0 8 0h-8Z" />,
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

function CallControls({ client, conversationId, userId, otherName }) {
  const [call, setCall] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [callError, setCallError] = useState('');
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const channelRef = useRef(null);
  const callRef = useRef(null);
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);
  const pendingCandidatesRef = useRef([]);
  const timeoutRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const remoteAudioRef = useRef(null);

  useEffect(() => {
    let active = true;

    const updateCall = (nextCall) => {
      callRef.current = nextCall;
      setCall(nextCall);
    };

    const cleanupCall = (updateState = true) => {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      peerRef.current?.close();
      peerRef.current = null;
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
      pendingCandidatesRef.current = [];
      if (updateState) {
        setLocalStream(null);
        setRemoteStream(null);
        updateCall(null);
      }
    };

    const sendSignal = async (kind, callId, details = {}) => {
      if (!channelRef.current) {
        throw new Error('The call connection is not ready.');
      }

      const status = await channelRef.current.send({
        type: 'broadcast',
        event: 'signal',
        payload: { kind, callId, senderId: userId, ...details },
      });

      if (status !== 'ok') {
        throw new Error('Could not send the call request. Please try again.');
      }
    };

    const createPeer = async (callId, mode) => {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Calls need a supported browser and a secure HTTPS connection.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: mode === 'video',
      });
      localStreamRef.current = stream;
      setLocalStream(stream);

      const peer = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });
      peerRef.current = peer;
      stream.getTracks().forEach((track) => peer.addTrack(track, stream));
      peer.ontrack = (event) => {
        const [incomingStream] = event.streams;
        if (incomingStream) {
          setRemoteStream(incomingStream);
        }
      };
      peer.onicecandidate = (event) => {
        if (event.candidate && callRef.current?.id === callId) {
          sendSignal('ice-candidate', callId, { candidate: event.candidate.toJSON() })
            .catch((error) => setCallError(error.message));
        }
      };
      peer.onconnectionstatechange = () => {
        if (peer.connectionState === 'connected' && callRef.current?.id === callId) {
          updateCall({ ...callRef.current, status: 'connected' });
        } else if (peer.connectionState === 'failed' && callRef.current?.id === callId) {
          setCallError('The call could not connect. Try again on another network.');
        }
      };

      return peer;
    };

    const armTimeout = (callId) => {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        if (callRef.current?.id !== callId) return;
        sendSignal('no-answer', callId).catch((error) => setCallError(error.message));
        cleanupCall();
        setCallError('There was no answer. You can try calling again.');
      }, 45000);
    };

    const handleSignal = async (payload) => {
      if (!payload || payload.senderId === userId || typeof payload.callId !== 'string') return;

      try {
        if (payload.kind === 'invite') {
          if (callRef.current) {
            await sendSignal('busy', payload.callId);
            return;
          }

          setCallError('');
          updateCall({
            id: payload.callId,
            mode: payload.mode === 'video' ? 'video' : 'audio',
            direction: 'incoming',
            status: 'ringing',
          });
          armTimeout(payload.callId);
          return;
        }

        if (payload.callId !== callRef.current?.id) return;

        if (payload.kind === 'accepted' && callRef.current.direction === 'outgoing') {
          window.clearTimeout(timeoutRef.current);
          const peer = await createPeer(payload.callId, callRef.current.mode);
          const offer = await peer.createOffer();
          await peer.setLocalDescription(offer);
          await sendSignal('offer', payload.callId, { description: peer.localDescription });
          updateCall({ ...callRef.current, status: 'connecting' });
        } else if (payload.kind === 'offer' && callRef.current.direction === 'incoming') {
          const peer = peerRef.current;
          if (!peer || !payload.description) return;
          await peer.setRemoteDescription(new RTCSessionDescription(payload.description));
          for (const candidate of pendingCandidatesRef.current) {
            await peer.addIceCandidate(new RTCIceCandidate(candidate));
          }
          pendingCandidatesRef.current = [];
          const answer = await peer.createAnswer();
          await peer.setLocalDescription(answer);
          await sendSignal('answer', payload.callId, { description: peer.localDescription });
        } else if (payload.kind === 'answer' && callRef.current.direction === 'outgoing') {
          const peer = peerRef.current;
          if (!peer || !payload.description) return;
          await peer.setRemoteDescription(new RTCSessionDescription(payload.description));
          for (const candidate of pendingCandidatesRef.current) {
            await peer.addIceCandidate(new RTCIceCandidate(candidate));
          }
          pendingCandidatesRef.current = [];
        } else if (payload.kind === 'ice-candidate' && payload.candidate) {
          if (peerRef.current?.remoteDescription) {
            await peerRef.current.addIceCandidate(new RTCIceCandidate(payload.candidate));
          } else {
            pendingCandidatesRef.current.push(payload.candidate);
          }
        } else if (payload.kind === 'declined') {
          cleanupCall();
          setCallError('The call was declined.');
        } else if (payload.kind === 'busy') {
          cleanupCall();
          setCallError('The other person is already on a call.');
        } else if (payload.kind === 'no-answer') {
          cleanupCall();
          setCallError('There was no answer. You can try calling again.');
        } else if (payload.kind === 'hangup') {
          cleanupCall();
          setCallError('The call ended.');
        }
      } catch (error) {
        const failedCallId = callRef.current?.id;
        if (failedCallId) {
          try {
            await sendSignal('hangup', failedCallId);
          } catch (signalError) {
            console.error('Could not notify the other participant that the call ended.', signalError);
          }
        }
        cleanupCall();
        setCallError(error.message || 'The call could not be started.');
      }
    };

    const channel = client
      .channel(`portfolio-call:${conversationId}`, { config: { private: true } })
      .on('broadcast', { event: 'signal' }, handleSignal);
    channelRef.current = channel;
    channel.subscribe((status) => {
      if (!active) return;
      if (status === 'SUBSCRIBED') {
        setIsReady(true);
      } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        setCallError('Calls are temporarily unavailable in this conversation.');
      }
    });

    return () => {
      active = false;
      cleanupCall(false);
      setIsReady(false);
      channelRef.current = null;
      client.removeChannel(channel);
    };
  }, [client, conversationId, userId]);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
    if (remoteAudioRef.current && remoteStream) {
      remoteAudioRef.current.srcObject = remoteStream;
    }
  }, [localStream, remoteStream, call?.mode]);

  const startCall = async (mode) => {
    if (!isReady || callRef.current) return;

    const nextCall = {
      id: window.crypto.randomUUID(),
      mode,
      direction: 'outgoing',
      status: 'ringing',
    };
    callRef.current = nextCall;
    setCall(nextCall);
    setCallError('');

    try {
      const status = await channelRef.current.send({
        type: 'broadcast',
        event: 'signal',
        payload: { kind: 'invite', callId: nextCall.id, mode, senderId: userId },
      });
      if (status !== 'ok') throw new Error('Could not send the call request. Please try again.');
      timeoutRef.current = window.setTimeout(() => {
        if (callRef.current?.id !== nextCall.id) return;
        channelRef.current.send({
          type: 'broadcast',
          event: 'signal',
          payload: { kind: 'no-answer', callId: nextCall.id, senderId: userId },
        }).catch((signalError) => {
          console.error('Could not send the call timeout signal.', signalError);
        });
        callRef.current = null;
        setCall(null);
        setCallError('There was no answer. You can try calling again.');
      }, 45000);
    } catch (error) {
      callRef.current = null;
      setCall(null);
      setCallError(error.message);
    }
  };

  const respondToCall = async (accepted) => {
    if (!call || call.direction !== 'incoming') return;

    try {
      window.clearTimeout(timeoutRef.current);
      if (!accepted) {
        const status = await channelRef.current.send({
          type: 'broadcast',
          event: 'signal',
          payload: { kind: 'declined', callId: call.id, senderId: userId },
        });
        if (status !== 'ok') throw new Error('Could not decline the call. Please try again.');
        callRef.current = null;
        setCall(null);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: call.mode === 'video',
      });
      localStreamRef.current = stream;
      setLocalStream(stream);
      const peer = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });
      peerRef.current = peer;
      stream.getTracks().forEach((track) => peer.addTrack(track, stream));
      peer.ontrack = (event) => {
        const [incomingStream] = event.streams;
        if (incomingStream) setRemoteStream(incomingStream);
      };
      peer.onicecandidate = (event) => {
        if (event.candidate && callRef.current?.id === call.id) {
          channelRef.current.send({
            type: 'broadcast',
            event: 'signal',
            payload: { kind: 'ice-candidate', callId: call.id, senderId: userId, candidate: event.candidate.toJSON() },
          }).catch((signalError) => setCallError(signalError.message || 'Call connection was interrupted.'));
        }
      };
      peer.onconnectionstatechange = () => {
        if (peer.connectionState === 'connected' && callRef.current?.id === call.id) {
          callRef.current = { ...callRef.current, status: 'connected' };
          setCall(callRef.current);
        } else if (peer.connectionState === 'failed' && callRef.current?.id === call.id) {
          setCallError('The call could not connect. Try again on another network.');
        }
      };
      callRef.current = { ...call, status: 'connecting' };
      setCall(callRef.current);
      const status = await channelRef.current.send({
        type: 'broadcast',
        event: 'signal',
        payload: { kind: 'accepted', callId: call.id, senderId: userId },
      });
      if (status !== 'ok') throw new Error('Could not accept the call. Please try again.');
    } catch (error) {
      try {
        await channelRef.current?.send({
          type: 'broadcast',
          event: 'signal',
          payload: { kind: 'hangup', callId: call.id, senderId: userId },
        });
      } catch (signalError) {
        console.error('Could not notify the caller that call setup failed.', signalError);
      }
      callRef.current = null;
      setCall(null);
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
      peerRef.current?.close();
      peerRef.current = null;
      setLocalStream(null);
      setRemoteStream(null);
      setCallError(error.message || 'The microphone or camera could not be started.');
    }
  };

  const endCall = async () => {
    if (call) {
      try {
        const status = await channelRef.current?.send({
          type: 'broadcast',
          event: 'signal',
          payload: { kind: 'hangup', callId: call.id, senderId: userId },
        });
        if (status && status !== 'ok') {
          throw new Error('The other person may not have received the call-ended signal.');
        }
      } catch (error) {
        setCallError(error.message || 'The call ended, but the other person may not have received the update.');
      }
    }

    window.clearTimeout(timeoutRef.current);
    peerRef.current?.close();
    peerRef.current = null;
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;
    pendingCandidatesRef.current = [];
    callRef.current = null;
    setLocalStream(null);
    setRemoteStream(null);
    setCall(null);
  };

  return (
    <div className="chat-call-controls">
      <div className="chat-call-actions">
        <span>Keep this conversation open to call.</span>
        <button type="button" onClick={() => startCall('audio')} disabled={!isReady || Boolean(call)}>
          Voice call
        </button>
        <button type="button" onClick={() => startCall('video')} disabled={!isReady || Boolean(call)}>
          Video call
        </button>
      </div>
      {callError && <p className="chat-inline-error" role="status">{callError}</p>}
      {call && (
        <div className="chat-call-overlay" role="dialog" aria-modal="true" aria-label="Call controls">
          <div className="chat-call-window">
            <div className="chat-call-heading">
              <div>
                <strong>{call.direction === 'incoming' ? `Incoming ${call.mode} call` : `${call.mode === 'video' ? 'Video' : 'Voice'} call`}</strong>
                <span>{call.direction === 'incoming' ? `From ${otherName}` : call.status === 'connected' ? 'Connected' : `Calling ${otherName}...`}</span>
              </div>
              {call.direction === 'incoming' && call.status === 'ringing' && (
                <button type="button" className="chat-icon-button" aria-label="Decline call" onClick={() => respondToCall(false)}>
                  ×
                </button>
              )}
            </div>
            {call.mode === 'video' && call.status !== 'ringing' && (
              <div className="chat-video-grid">
                <video ref={remoteVideoRef} autoPlay playsInline aria-label="Other participant video" />
                <video ref={localVideoRef} autoPlay playsInline muted aria-label="Your camera preview" />
              </div>
            )}
            {call.mode === 'audio' && call.status !== 'ringing' && (
              <audio ref={remoteAudioRef} autoPlay />
            )}
            {call.direction === 'incoming' && call.status === 'ringing' ? (
              <div className="chat-call-actions chat-call-actions--prompt">
                <button type="button" className="chat-button chat-button--accept" onClick={() => respondToCall(true)}>
                  Accept call
                </button>
                <button type="button" className="chat-button chat-button--quiet" onClick={() => respondToCall(false)}>
                  Decline
                </button>
              </div>
            ) : (
              <>
                {callError && <p className="chat-inline-error" role="alert">{callError}</p>}
                <button type="button" className="chat-button chat-button--end" onClick={endCall}>
                  End call
                </button>
              </>
            )}
            <p className="chat-call-privacy">Your camera and microphone are requested only after you accept.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ChatDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState(null);
  const [config, setConfig] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConversationLoading, setIsConversationLoading] = useState(false);
  const [error, setError] = useState('');
  const [ownerLoginOpen, setOwnerLoginOpen] = useState(false);
  const [ownerConversations, setOwnerConversations] = useState([]);
  const [isOwnerLoading, setIsOwnerLoading] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [filter, setFilter] = useState('pending');
  const messageEndRef = useRef(null);
  const activeConversation = user?.id === config?.ownerId ? selectedConversation : conversation;
  const isOwner = Boolean(user && config && user.id === config.ownerId);
  const pendingRequestCount = isOwner
    ? ownerConversations.filter((item) => item.status === 'pending').length
    : 0;

  useEffect(() => {
    let isMounted = true;
    let authSubscription;

    const initializeChat = async () => {
      try {
        const response = await fetch('/.netlify/functions/chat-config');
        let settings;
        try {
          settings = await response.json();
        } catch {
          throw new Error('Chat setup could not be reached. Please use the deployed Netlify site.');
        }
        if (!response.ok) {
          throw new Error(settings.error || 'Chat is not available yet.');
        }
        if (!window.supabase?.createClient) {
          throw new Error('The chat service could not be loaded. Please refresh the page.');
        }

        const chatClient = window.supabase.createClient(settings.supabaseUrl, settings.supabaseAnonKey);
        const authState = chatClient.auth.onAuthStateChange((_event, session) => {
          if (isMounted) setUser(session?.user || null);
        });
        authSubscription = authState.data.subscription;

        const { data, error: sessionError } = await chatClient.auth.getSession();
        if (sessionError) throw sessionError;
        if (isMounted) {
          setClient(chatClient);
          setConfig(settings);
          setUser(data.session?.user || null);
          setIsLoading(false);
        }
      } catch (loadError) {
        console.error('Could not initialize portfolio chat.', loadError);
        if (isMounted) {
          setError(loadError.message || 'Chat is temporarily unavailable.');
          setIsLoading(false);
        }
      }
    };

    initializeChat();
    return () => {
      isMounted = false;
      authSubscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!client || !user || isOwner) return undefined;
    let isActive = true;
    setIsConversationLoading(true);

    const loadConversation = async () => {
      const { data, error: loadError } = await client
        .from('portfolio_chat_conversations')
        .select('*')
        .eq('visitor_id', user.id)
        .in('status', ['pending', 'accepted'])
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!isActive) return;
      if (loadError) {
        setError('Your conversation could not be loaded. Please refresh and try again.');
      } else {
        setConversation(data || null);
        setError('');
      }
      setIsConversationLoading(false);
    };

    loadConversation();
    const channel = client
      .channel(`portfolio-chat-visitor:${user.id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'portfolio_chat_conversations', filter: `visitor_id=eq.${user.id}` },
        (payload) => {
          if (payload.new.status === 'declined') {
            setConversation(null);
          } else {
            setConversation(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      isActive = false;
      client.removeChannel(channel);
    };
  }, [client, user?.id, isOwner]);

  useEffect(() => {
    if (!client || !isOwner || !user) return undefined;
    let isActive = true;
    setIsOwnerLoading(true);

    const loadOwnerConversations = async () => {
      const { data, error: loadError } = await client
        .from('portfolio_chat_conversations')
        .select('*')
        .eq('owner_id', user.id)
        .in('status', ['pending', 'accepted'])
        .order('created_at', { ascending: false });

      if (!isActive) return;
      if (loadError) {
        setError('Your inbox could not be loaded. Please try again.');
      } else {
        setOwnerConversations(data || []);
        setError('');
      }
      setIsOwnerLoading(false);
    };

    loadOwnerConversations();
    const channel = client
      .channel(`portfolio-chat-owner:${user.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'portfolio_chat_conversations', filter: `owner_id=eq.${user.id}` },
        loadOwnerConversations
      )
      .subscribe();

    return () => {
      isActive = false;
      client.removeChannel(channel);
    };
  }, [client, user?.id, isOwner]);

  useEffect(() => {
    if (!selectedConversation) return;
    const currentConversation = ownerConversations.find((item) => item.id === selectedConversation.id);
    if (!currentConversation) {
      setSelectedConversation(null);
    } else if (currentConversation.status !== selectedConversation.status) {
      setSelectedConversation(currentConversation);
    }
  }, [ownerConversations, selectedConversation?.id, selectedConversation?.status]);

  useEffect(() => {
    if (!client || !user || !activeConversation || activeConversation.status !== 'accepted') {
      setMessages([]);
      return undefined;
    }

    let isActive = true;
    const conversationId = activeConversation.id;
    setMessages([]);

    const loadMessages = async () => {
      const { data, error: loadError } = await client
        .from('portfolio_chat_messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (!isActive) return;
      if (loadError) {
        setError('Messages could not be loaded. Please reopen the conversation.');
      } else {
        setMessages((currentMessages) => {
          const messagesById = new Map((data || []).map((message) => [message.id, message]));
          currentMessages.forEach((message) => messagesById.set(message.id, message));
          return [...messagesById.values()].sort(
            (left, right) => new Date(left.created_at) - new Date(right.created_at)
          );
        });
      }
    };

    loadMessages();
    const channel = client
      .channel(`portfolio-chat-messages:${conversationId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'portfolio_chat_messages', filter: `conversation_id=eq.${conversationId}` },
        (payload) => {
          setMessages((currentMessages) => (
            currentMessages.some((message) => message.id === payload.new.id)
              ? currentMessages
              : [...currentMessages, payload.new]
          ));
        }
      )
      .subscribe();

    return () => {
      isActive = false;
      client.removeChannel(channel);
    };
  }, [client, user?.id, activeConversation?.id, activeConversation?.status]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, activeConversation?.request_message]);

  const handleRequestSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsBusy(true);

    try {
      let visitor = user;
      if (!visitor) {
        const { data, error: signInError } = await client.auth.signInAnonymously();
        if (signInError) throw signInError;
        visitor = data.user;
      }

      if (!visitor?.id || visitor.id === config.ownerId) {
        throw new Error('Please use a visitor browser session to send a request.');
      }

      const { data, error: insertError } = await client
        .from('portfolio_chat_conversations')
        .insert({
          visitor_id: visitor.id,
          owner_id: config.ownerId,
          visitor_name: visitorName.trim(),
          visitor_email: visitorEmail.trim(),
          request_message: requestMessage.trim(),
        })
        .select()
        .single();

      if (insertError) throw insertError;
      setConversation(data);
      setVisitorName('');
      setVisitorEmail('');
      setRequestMessage('');
    } catch (submitError) {
      console.error('Could not send chat request.', submitError);
      setError(
        submitError.code === '23505'
          ? 'You already have an open request or conversation in this browser.'
          : submitError.message || 'Your request could not be sent. Please try again.'
      );
    } finally {
      setIsBusy(false);
    }
  };

  const handleOwnerLogin = async (event) => {
    event.preventDefault();
    setError('');
    setIsBusy(true);

    try {
      const { data, error: signInError } = await client.auth.signInWithPassword({
        email: ownerEmail.trim(),
        password: ownerPassword,
      });
      if (signInError) throw signInError;
      if (data.user?.id !== config.ownerId) {
        await client.auth.signOut();
        throw new Error('This account is not authorized to access the portfolio inbox.');
      }
      setOwnerPassword('');
      setOwnerLoginOpen(false);
    } catch (loginError) {
      console.error('Could not sign in to portfolio chat owner view.', loginError);
      setError(loginError.message || 'Sign-in failed. Check your email and password.');
    } finally {
      setIsBusy(false);
    }
  };

  const updateConversationStatus = async (nextStatus) => {
    if (!selectedConversation) return;
    setError('');
    setIsBusy(true);

    try {
      const { data, error: updateError } = await client
        .from('portfolio_chat_conversations')
        .update({ status: nextStatus })
        .eq('id', selectedConversation.id)
        .select()
        .single();
      if (updateError) throw updateError;
      setSelectedConversation(data);
      setOwnerConversations((current) => current.map((item) => (item.id === data.id ? data : item)));
      if (nextStatus === 'declined') setSelectedConversation(null);
    } catch (updateError) {
      console.error('Could not update chat request.', updateError);
      setError('The request could not be updated. Please try again.');
    } finally {
      setIsBusy(false);
    }
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    const body = draft.trim();
    if (!body || !activeConversation || !user) return;
    setError('');
    setIsBusy(true);

    try {
      const { data, error: sendError } = await client
        .from('portfolio_chat_messages')
        .insert({
          conversation_id: activeConversation.id,
          sender_id: user.id,
          body,
        })
        .select()
        .single();
      if (sendError) throw sendError;
      setMessages((current) => (
        current.some((message) => message.id === data.id) ? current : [...current, data]
      ));
      setDraft('');
    } catch (sendError) {
      console.error('Could not send chat message.', sendError);
      setError('Your message could not be sent. Please try again.');
    } finally {
      setIsBusy(false);
    }
  };

  const signOutOwner = async () => {
    setError('');
    const { error: signOutError } = await client.auth.signOut();
    if (signOutError) {
      setError('You could not be signed out. Please try again.');
      return;
    }
    setSelectedConversation(null);
    setOwnerConversations([]);
  };

  const renderMessages = () => {
    const initialRequest = activeConversation?.request_message
      ? [{
        id: `request-${activeConversation.id}`,
        sender_id: activeConversation.visitor_id,
        body: activeConversation.request_message,
        created_at: activeConversation.created_at,
      }]
      : [];
    const allMessages = [...initialRequest, ...messages];

    return (
      <div className="chat-messages" aria-live="polite">
        {allMessages.length === 0 && (
          <p className="chat-empty-messages">You’re connected. Send a message to get started.</p>
        )}
        {allMessages.map((message) => {
          const isMine = message.sender_id === user?.id;
          return (
            <div key={message.id} className={`chat-message ${isMine ? 'chat-message--mine' : ''}`}>
              <p>{message.body}</p>
              <time dateTime={message.created_at}>
                {new Date(message.created_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
              </time>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>
    );
  };

  const renderThread = (active, otherName) => (
    <>
      {isOwner && (
        <div className="chat-thread-topline">
          <button type="button" className="chat-back-button" onClick={() => setSelectedConversation(null)}>
            ‹ Inbox
          </button>
          <span>{active.visitor_email}</span>
        </div>
      )}
      <div className="chat-thread-status">
        <span className="chat-online-dot" />
        {isOwner ? `Connected with ${active.visitor_name}` : `Connected with ${otherName}`}
      </div>
      {renderMessages()}
      <form className="chat-compose" onSubmit={sendMessage}>
        <label className="sr-only" htmlFor="chat-message-input">Write a message</label>
        <textarea
          id="chat-message-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form.requestSubmit();
            }
          }}
          maxLength={2000}
          placeholder="Write a message..."
          rows="2"
          disabled={isBusy}
        />
        <button type="submit" className="chat-send-button" disabled={isBusy || !draft.trim()}>
          Send
        </button>
      </form>
      <CallControls
        client={client}
        conversationId={active.id}
        userId={user.id}
        otherName={otherName}
      />
    </>
  );

  return (
    <div className="chat-dock">
      {isOpen && (
        <section className="chat-panel" aria-label="Direct message beta">
          <header className="chat-header">
            <div>
              <span className="chat-eyebrow">PORTFOLIO CHAT · BETA</span>
              <h2>{isOwner ? 'Your inbox' : 'Let’s talk'}</h2>
            </div>
            <div className="chat-header-actions">
              {client && !isOwner && !ownerLoginOpen && (
                <button type="button" className="chat-owner-link" onClick={() => setOwnerLoginOpen(true)}>
                  Owner sign in
                </button>
              )}
              <button type="button" className="chat-icon-button" aria-label="Close chat" onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>
          </header>

          {error && client && <p className="chat-error" role="alert">{error}</p>}

          <div className="chat-content">
            {isLoading ? (
              <p className="chat-loading">Connecting to chat...</p>
            ) : !client ? (
              <div className="chat-unavailable">
                <h3>Chat is not connected yet</h3>
                <p>{error || 'The messaging beta has not been configured.'}</p>
                <p>You can still reach me at <a href="mailto:subinmain100@gmail.com">subinmain100@gmail.com</a>.</p>
              </div>
            ) : isOwner ? (
              selectedConversation ? (
                selectedConversation.status === 'pending' ? (
                  <div className="chat-request-detail">
                    <button type="button" className="chat-back-button" onClick={() => setSelectedConversation(null)}>
                      ‹ Inbox
                    </button>
                    <div className="chat-request-person">
                      <span className="chat-avatar">{selectedConversation.visitor_name.slice(0, 1).toUpperCase()}</span>
                      <div>
                        <h3>{selectedConversation.visitor_name}</h3>
                        <p>{selectedConversation.visitor_email}</p>
                      </div>
                    </div>
                    <span className="chat-request-label">MESSAGE REQUEST</span>
                    <p className="chat-request-message">{selectedConversation.request_message}</p>
                    <p className="chat-privacy-note">Accepting opens text chat and lets either of you request a call.</p>
                    <div className="chat-request-actions">
                      <button
                        type="button"
                        className="chat-button chat-button--accept"
                        disabled={isBusy}
                        onClick={() => updateConversationStatus('accepted')}
                      >
                        Accept request
                      </button>
                      <button
                        type="button"
                        className="chat-button chat-button--quiet"
                        disabled={isBusy}
                        onClick={() => updateConversationStatus('declined')}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ) : (
                  renderThread(selectedConversation, selectedConversation.visitor_name)
                )
              ) : (
                <div className="chat-inbox">
                  <div className="chat-inbox-tabs" role="tablist" aria-label="Inbox filter">
                    <button type="button" className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>
                      Requests
                      <span>{ownerConversations.filter((item) => item.status === 'pending').length}</span>
                    </button>
                    <button type="button" className={filter === 'accepted' ? 'active' : ''} onClick={() => setFilter('accepted')}>
                      Chats
                      <span>{ownerConversations.filter((item) => item.status === 'accepted').length}</span>
                    </button>
                    <button type="button" className="chat-signout-button" onClick={signOutOwner}>Sign out</button>
                  </div>
                  {isOwnerLoading ? (
                    <p className="chat-loading">Loading your inbox...</p>
                  ) : ownerConversations.filter((item) => item.status === filter).length === 0 ? (
                    <div className="chat-inbox-empty">
                      <span aria-hidden="true">{filter === 'pending' ? '✳' : '↗'}</span>
                      <p>{filter === 'pending' ? 'New message requests will appear here.' : 'Accepted conversations will appear here.'}</p>
                    </div>
                  ) : (
                    <div className="chat-inbox-list">
                      {ownerConversations
                        .filter((item) => item.status === filter)
                        .map((item) => (
                          <button
                            type="button"
                            className="chat-inbox-item"
                            key={item.id}
                            onClick={() => setSelectedConversation(item)}
                          >
                            <span className="chat-avatar">{item.visitor_name.slice(0, 1).toUpperCase()}</span>
                            <span className="chat-inbox-copy">
                              <strong>{item.visitor_name}</strong>
                              <span>{item.request_message}</span>
                            </span>
                            <time>{new Date(item.created_at).toLocaleDateString()}</time>
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              )
            ) : ownerLoginOpen ? (
              <form className="chat-form" onSubmit={handleOwnerLogin}>
                <button type="button" className="chat-back-button" onClick={() => setOwnerLoginOpen(false)}>
                  ‹ Back to visitor chat
                </button>
                <h3>Owner sign in</h3>
                <p>Private inbox access for Subin.</p>
                <label htmlFor="chat-owner-email">Email</label>
                <input id="chat-owner-email" type="email" autoComplete="username" value={ownerEmail} onChange={(event) => setOwnerEmail(event.target.value)} required />
                <label htmlFor="chat-owner-password">Password</label>
                <input id="chat-owner-password" type="password" autoComplete="current-password" value={ownerPassword} onChange={(event) => setOwnerPassword(event.target.value)} required />
                <button type="submit" className="chat-button chat-button--accept" disabled={isBusy}>
                  {isBusy ? 'Signing in...' : 'Sign in'}
                </button>
              </form>
            ) : isConversationLoading ? (
              <p className="chat-loading">Loading your conversation...</p>
            ) : conversation?.status === 'accepted' ? (
              renderThread(conversation, 'Subin')
            ) : conversation?.status === 'pending' ? (
              <div className="chat-waiting">
                <span className="chat-waiting-mark" aria-hidden="true">✓</span>
                <h3>Request sent</h3>
                <p>Your message is with Subin. Once accepted, you can chat and request a voice or video call.</p>
                <p className="chat-privacy-note">Keep this browser open to see the response. Your guest email is not verified.</p>
              </div>
            ) : (
              <form className="chat-form" onSubmit={handleRequestSubmit}>
                <p className="chat-intro">Send a message request. I’ll review it before the conversation opens.</p>
                <label htmlFor="chat-visitor-name">Your name</label>
                <input id="chat-visitor-name" value={visitorName} onChange={(event) => setVisitorName(event.target.value)} maxLength={80} autoComplete="name" required />
                <label htmlFor="chat-visitor-email">Email</label>
                <input id="chat-visitor-email" type="email" value={visitorEmail} onChange={(event) => setVisitorEmail(event.target.value)} maxLength={254} autoComplete="email" required />
                <label htmlFor="chat-request-message">What would you like to discuss?</label>
                <textarea id="chat-request-message" value={requestMessage} onChange={(event) => setRequestMessage(event.target.value)} maxLength={2000} rows="4" required />
                <p className="chat-privacy-note">Your name and email are shared with Subin to handle this request. Email is not verified in this beta; messages are not end-to-end encrypted.</p>
                <button type="submit" className="chat-button chat-button--accept" disabled={isBusy || !visitorName.trim() || !visitorEmail.trim() || !requestMessage.trim()}>
                  {isBusy ? 'Sending request...' : 'Send message request'}
                </button>
              </form>
            )}
          </div>
        </section>
      )}
      <button
        type="button"
        className={`chat-launcher ${isOpen ? 'chat-launcher--open' : ''}`}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close direct message chat' : 'Open direct message chat'}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span aria-hidden="true">{isOpen ? '×' : '✳'}</span>
        <span>{isOpen ? 'Close' : isOwner ? 'Inbox' : 'Message me'}</span>
        {pendingRequestCount > 0 && (
          <span className="chat-launcher-badge" aria-label={`${pendingRequestCount} pending requests`}>
            {pendingRequestCount}
          </span>
        )}
      </button>
    </div>
  );
}

const education = [
  {
    degree: 'Master of Science in Information Technology',
    school: 'University of the West of Scotland',
    location: 'Glasgow, Scotland, United Kingdom',
    dates: 'January 2026 – Present',
    note: 'Expected graduation: February 2027.',
    image: 'UWS.png',
  },
  {
    degree: 'Bachelor of Information Management',
    school: 'Kathmandu Institute of Science and Technology',
    location: 'Kathmandu, Nepal',
    dates: 'September 2018 – 2023',
    note: 'First Class Honours, GPA: 3.25/4.0',
    image: 'kist college.jpg',
  },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedName, setTypedName] = useState('');
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [visitorId, setVisitorId] = useState('');
  const [portfolioStats, setPortfolioStats] = useState(null);
  const [statsMessage, setStatsMessage] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [isLiking, setIsLiking] = useState(false);
  const [isDownloadingResume, setIsDownloadingResume] = useState(false);
  const experienceDisclosureRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const loadStats = async () => {
      try {
        const id = getVisitorId();
        const stats = await fetchPortfolioStats(id);

        if (isMounted) {
          setVisitorId(id);
          setPortfolioStats(stats);
        }
      } catch (error) {
        console.error('Could not load portfolio engagement stats.', error);
        if (isMounted) {
          setStatsMessage('Counts sync after Netlify deployment.');
        }
      }
    };

    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const name = 'Subin Ratna Tuladhar';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setTypedName(name);
      return undefined;
    }

    let characterIndex = 0;
    let deleting = false;
    let typingTimeout;

    const animateName = () => {
      if (deleting) {
        characterIndex -= 1;
        setTypedName(name.slice(0, characterIndex));

        if (characterIndex === 0) {
          deleting = false;
          typingTimeout = window.setTimeout(animateName, 550);
        } else {
          typingTimeout = window.setTimeout(animateName, 45);
        }
        return;
      }

      characterIndex += 1;
      setTypedName(name.slice(0, characterIndex));

      if (characterIndex === name.length) {
        deleting = true;
        typingTimeout = window.setTimeout(animateName, 1500);
      } else {
        typingTimeout = window.setTimeout(animateName, 85);
      }
    };

    typingTimeout = window.setTimeout(animateName, 250);
    return () => window.clearTimeout(typingTimeout);
  }, []);

  useLayoutEffect(() => {
    const panel = experienceDisclosureRef.current;
    if (!panel) return undefined;

    const targetHeight = experienceOpen ? panel.scrollHeight : 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      panel.style.height = experienceOpen ? 'auto' : '0px';
      return undefined;
    }

    const startHeight = panel.getBoundingClientRect().height;
    const animation = panel.animate(
      [
        {
          height: `${startHeight}px`,
          opacity: experienceOpen ? 0 : 1,
          transform: experienceOpen ? 'translateY(-16px)' : 'translateY(0)',
        },
        {
          height: `${targetHeight}px`,
          opacity: experienceOpen ? 1 : 0,
          transform: experienceOpen ? 'translateY(0)' : 'translateY(-16px)',
        },
      ],
      {
        duration: 720,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards',
      }
    );

    animation.onfinish = () => {
      panel.style.height = experienceOpen ? 'auto' : '0px';
      animation.cancel();
    };

    return () => animation.cancel();
  }, [experienceOpen]);

  useEffect(() => {
    const updateTheme = () => {
      document.body.classList.toggle('scrolled', window.scrollY > 12);
      document.body.classList.toggle('has-hover', window.matchMedia('(hover: hover)').matches);
    };

    updateTheme();
    window.addEventListener('scroll', updateTheme);

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: [0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));

    const revealEls = document.querySelectorAll('.reveal, .scroll-reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.16 }
    );

    revealEls.forEach((el) => revealObserver.observe(el));

    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      window.addEventListener('pointermove', (event) => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
      });

      document.querySelectorAll('a, button, .project-card, .skill-tag').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          cursor.style.width = '22px';
          cursor.style.height = '22px';
        });

        el.addEventListener('mouseleave', () => {
          cursor.style.width = '14px';
          cursor.style.height = '14px';
        });
      });
    }

    return () => {
      observer.disconnect();
      revealObserver.disconnect();
      window.removeEventListener('scroll', updateTheme);
    };
  }, []);

  const handleNavigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleLike = async () => {
    if (isLiking) return;
    if (!visitorId || !portfolioStats) {
      setActionMessage('Likes sync when this portfolio is deployed on Netlify.');
      return;
    }

    setIsLiking(true);
    setActionMessage('');

    try {
      const response = await fetch(STATS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: portfolioStats.liked ? 'unlike' : 'like',
          visitorId,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Could not update the like.');
      }

      setPortfolioStats(data);
    } catch (error) {
      console.error('Could not update portfolio like.', error);
      setActionMessage('Your like could not be saved. Please try again.');
    } finally {
      setIsLiking(false);
    }
  };

  const handleResumeDownload = async () => {
    if (isDownloadingResume) return;
    if (!portfolioStats) {
      const downloadLink = document.createElement('a');
      downloadLink.href = RESUME_FILENAME;
      downloadLink.download = RESUME_FILENAME;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      setActionMessage('Downloading the CV without global count tracking.');
      return;
    }

    if (!portfolioStats.resumeAvailable) {
      setActionMessage(`Add ${RESUME_FILENAME} to enable resume downloads.`);
      return;
    }

    setIsDownloadingResume(true);
    setActionMessage('');

    try {
      const response = await fetch(RESUME_ENDPOINT);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'The resume could not be downloaded.');
      }

      const resumeBlob = await response.blob();
      const resumeUrl = URL.createObjectURL(resumeBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = resumeUrl;
      downloadLink.download = RESUME_FILENAME;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      window.setTimeout(() => URL.revokeObjectURL(resumeUrl), 1000);

      if (response.headers.get('x-download-counted') === 'false') {
        setActionMessage('The resume downloaded, but its download count could not be updated.');
      } else {
        const stats = await fetchPortfolioStats(visitorId);
        setPortfolioStats(stats);
      }
    } catch (error) {
      console.error('Could not download resume.', error);
      setActionMessage('The resume could not be downloaded. Please try again later.');
    } finally {
      setIsDownloadingResume(false);
    }
  };

  const handleShare = async () => {
    setActionMessage('');
    const shareData = {
      title: document.title,
      text: 'Take a look at my portfolio.',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setActionMessage('Thanks for sharing my portfolio.');
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url);
        setActionMessage('Portfolio link copied to your clipboard.');
        return;
      }

      window.prompt('Copy this portfolio link:', shareData.url);
      setActionMessage('Copy the link to share my portfolio.');
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Could not share portfolio.', error);
        setActionMessage('The portfolio link could not be shared. Please copy the URL from your browser.');
      }
    }
  };

  const toggleExperience = () => setExperienceOpen((isOpen) => !isOpen);

  return (
    <>
      <div className="custom-cursor" aria-hidden="true" />

      <header className="topbar">
        <nav className={`nav ${menuOpen ? 'mobile-open' : ''}`} aria-label="Main navigation">
          <button
            className="nav-toggle"
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ☰
          </button>

          <div className="nav-links">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleNavigate(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="nav-button resume-button"
            type="button"
            onClick={handleResumeDownload}
            disabled={isDownloadingResume}
            title={portfolioStats?.resumeAvailable ? 'Download resume' : 'Resume PDF coming soon'}
          >
            Resume
            <span
              className="resume-count"
              aria-label={portfolioStats ? `${portfolioStats.downloads} resume downloads` : 'Loading resume download count'}
            >
              {portfolioStats?.downloads ?? '–'}
            </span>
          </button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section reveal">
          <div>
            <p className="hero-name" aria-label="Subin Ratna Tuladhar">
              <span aria-hidden="true">{typedName}</span>
              <span className="hero-name__caret" aria-hidden="true" />
            </p>
            <span className="eyebrow">Product designer • Developer • Collaborator</span>
            <h1>
              Designing experiences.
              <br />
              Understanding technology.
              <br />
              Building what matters.
            </h1>
            <p>
              I&apos;m Subin — a multidisciplinary digital product designer with a background in UI/UX design, software development and product coordination.
            </p>
            <div className="hero__actions">
              <button className="button button--primary" type="button" onClick={() => handleNavigate('work')}>
                Explore my work
              </button>
              <button className="button button--secondary" type="button" onClick={() => handleNavigate('contact')}>
                Let&apos;s connect
              </button>
              <button
                className="button button--secondary resume-button"
                type="button"
                onClick={handleResumeDownload}
                disabled={isDownloadingResume}
                title={portfolioStats?.resumeAvailable ? 'Download resume' : 'Resume PDF coming soon'}
              >
                {isDownloadingResume ? 'Preparing resume…' : 'Resume'}
                <span
                  className="resume-count"
                  aria-label={portfolioStats ? `${portfolioStats.downloads} resume downloads` : 'Loading resume download count'}
                >
                  {portfolioStats?.downloads ?? '–'}
                </span>
              </button>
              <button
                className={`button button--secondary engagement-button ${portfolioStats?.liked ? 'is-liked' : ''}`}
                type="button"
                onClick={handleLike}
                disabled={isLiking}
                aria-pressed={Boolean(portfolioStats?.liked)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                </svg>
                {portfolioStats?.liked ? 'Loved' : 'Love'} <span>{portfolioStats?.likes ?? '–'}</span>
              </button>
              <button className="button button--secondary" type="button" onClick={handleShare}>
                Share
              </button>
            </div>
            <p className="engagement-message" role="status" aria-live="polite">
              {actionMessage || statsMessage}
            </p>
            <div className="hero__meta">
              <div>Glasgow, Scotland</div>
              <div>Open to meaningful design opportunities</div>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero-disciplines" aria-label="Design, development, and management experience">
              <span className="hero-discipline hero-discipline--design">
                <CapabilityIcon name="design" />
                Design
              </span>
              <span className="hero-discipline hero-discipline--development">
                <CapabilityIcon name="development" />
                Development
              </span>
              <span className="hero-discipline hero-discipline--management">
                <CapabilityIcon name="people" />
                Management
              </span>
            </div>
            <div className="profile-card">
              <img src="587817937_17973889187967118_1495142430447390821_n__1_-removebg-preview.png" alt="Portrait of Subin Ratna Tuladhar" />
            </div>
          </div>
        </section>

        <section id="about" className="section about reveal">
          <div className="section-head">
            <div>
              <span className="kicker">About</span>
              <h2 className="section-title">A product-minded designer with technical depth.</h2>
            </div>
          </div>

          <div className="story-grid">
            <div className="story-card scroll-reveal">
              <p>
                My professional journey began with a strong interest in information systems, design, and how technology can support people in their everyday decisions. Through my degree in Information Management, I developed an understanding of both technical systems and business needs. That foundation shaped the way I approach digital product design: combining clarity, structure, and empathy with practical implementation knowledge.
              </p>
              <div className="story-points">
                <div className="story-point">Design-led thinking grounded in user insight.</div>
                <div className="story-point">Technical awareness that supports better product decisions.</div>
                <div className="story-point">Collaborative process with people at the centre.</div>
                <div className="story-point">Continuous learning across product, design, and development.</div>
              </div>
            </div>

            <div className="story-card story-quote scroll-reveal">
              <div>
                <span className="kicker">Philosophy</span>
                <blockquote>“I believe great digital products happen when design, technology and people work together.”</blockquote>
              </div>
              <p>
                I enjoy understanding real problems, shaping intuitive experiences, and helping teams turn ideas into thoughtful, accessible digital solutions.
              </p>
            </div>
          </div>
        </section>

        <section id="work" className="section work reveal">
          <div className="section-head">
            <div>
              <span className="kicker">Selected work</span>
              <h2 className="section-title">Featured projects.</h2>
            </div>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                className="project-card scroll-reveal"
                key={project.name}
                style={{ '--reveal-delay': `${index * 120}ms` }}
              >
                <div className={`project-visual project-visual--${project.theme}`}>
                  <div className="project-visual__top">
                    <span className="project-tag">{project.type}</span>
                    <span className="project-index">0{projects.indexOf(project) + 1}</span>
                  </div>
                  {project.theme === 'financial' && (
                    <div className="artwork artwork--finance" aria-label="Conceptual financial platform visual">
                      <div className="finance-window">
                        <div className="finance-window__bar">
                          <span className="window-dots"><i /><i /><i /></span>
                          <span>MARKET OVERVIEW</span>
                          <span className="finance-live"><i /> LIVE</span>
                        </div>
                        <div className="finance-window__body">
                          <div className="finance-heading">
                            <span>Portfolio performance</span>
                            <b>Visual concept</b>
                          </div>
                          <div className="finance-chart">
                            <div className="finance-chart__lines"><i /><i /><i /></div>
                            <svg viewBox="0 0 520 140" preserveAspectRatio="none" aria-hidden="true">
                              <defs>
                                <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                                  <stop offset="0%" stopColor="#d9ff44" stopOpacity=".3" />
                                  <stop offset="100%" stopColor="#d9ff44" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              <path d="M0 112 C42 103 43 77 86 85 S135 100 177 69 S223 83 263 49 S319 69 356 44 S401 54 438 26 S481 33 520 10 V140 H0 Z" fill="url(#chartFill)" />
                              <path d="M0 112 C42 103 43 77 86 85 S135 100 177 69 S223 83 263 49 S319 69 356 44 S401 54 438 26 S481 33 520 10" fill="none" stroke="#d9ff44" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                            </svg>
                          </div>
                          <div className="finance-footer">
                            <span>Stocks <i /></span>
                            <span>Trading <i /></span>
                            <span>Portfolio <i /></span>
                          </div>
                        </div>
                      </div>
                      <span className="artwork-caption">Conceptual visual · not a project screenshot</span>
                    </div>
                  )}
                  {project.theme === 'commerce' && (
                    <div className="artwork artwork--commerce" aria-label="Conceptual e-commerce storefront visual">
                      <div className="shop-window">
                        <div className="shop-window__bar">
                          <b>STUDIO / STORE</b>
                          <span>CATALOGUE　 BAG (0)</span>
                        </div>
                        <div className="shop-window__intro">
                          <span>CURATED FINDS</span>
                          <b>A little more<br />considered.</b>
                          <i>↗</i>
                        </div>
                        <div className="shop-products">
                          <div className="shop-product">
                            <div className="shop-product__image shop-product__image--one"><i /></div>
                            <span>OBJECT 01</span>
                          </div>
                          <div className="shop-product">
                            <div className="shop-product__image shop-product__image--two"><i /></div>
                            <span>OBJECT 02</span>
                          </div>
                          <div className="shop-product">
                            <div className="shop-product__image shop-product__image--three"><i /></div>
                            <span>OBJECT 03</span>
                          </div>
                        </div>
                      </div>
                      <span className="artwork-caption">Conceptual visual · not a project screenshot</span>
                    </div>
                  )}
                  {project.theme === 'heritage' && (
                    <div className="artwork artwork--heritage" aria-label="Chiva Chaitya identity and conceptual cultural heritage visual">
                      <span className="heritage-orbit heritage-orbit--one" />
                      <span className="heritage-orbit heritage-orbit--two" />
                      <div className="heritage-mark">
                        <img className="project-logo" src={project.image} alt="Chiva Chaitya logo" />
                      </div>
                      <div className="heritage-title">
                        <span>PLACE · MEMORY · CULTURE</span>
                        <b>Stories that<br />stay with us.</b>
                      </div>
                      <span className="artwork-caption">Conceptual visual · not a project screenshot</span>
                    </div>
                  )}
                </div>

                <div className="project-copy">
                  <h3>
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        {project.name}
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <div className="project-meta">
                    <span>{project.org}</span>
                    <span>{project.role}</span>
                  </div>
                  <p>{project.summary}</p>
                  <ul>
                    {project.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <aside className="upcoming-project scroll-reveal">
            <div className="upcoming-project__mark" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <path d="M24 42s14-13.2 14-24A14 14 0 1 0 10 18c0 10.8 14 24 14 24Z" />
                <circle cx="24" cy="18" r="5" />
                <path d="M3 42h42" />
              </svg>
            </div>
            <div className="upcoming-project__copy">
              <span className="upcoming-project__eyebrow">On the horizon · Upcoming project</span>
              <h3>FindmyPlace</h3>
              <p>
                An upcoming rental-platform concept focused on helping people find genuine, verified places to live with greater safety and confidence. Interested in the idea or exploring a collaboration? Send me a DM or an email.
              </p>
              <div className="upcoming-project__actions">
                <a href="https://linkedin.com/in/subinrat" target="_blank" rel="noreferrer">
                  DM me on LinkedIn <span aria-hidden="true">↗</span>
                </a>
                <a href="mailto:subinmain100@gmail.com?subject=FindmyPlace">
                  Send me an email <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <span className="upcoming-project__index" aria-hidden="true">IN PROGRESS</span>
          </aside>
        </section>

        <section id="experience" className="section experience reveal">
          <div className="section-head">
            <div>
              <span className="kicker">Experience</span>
              <h2 className="section-title">One journey, three perspectives.</h2>
            </div>
          </div>

          <aside
            className={`experience-intro ${experienceOpen ? 'is-open' : ''}`}
            role="button"
            tabIndex={0}
            aria-expanded={experienceOpen}
            aria-controls="experience-details"
            onClick={toggleExperience}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleExperience();
              }
            }}
          >
            <div className="experience-intro__copy">
              <span className="experience-intro__label">A note on my path · click to explore</span>
              <h3>Different roles. One intentional direction.</h3>
              <p>
                My experience in design, software development, and programme management isn’t a series of unrelated career moves. I’ve intentionally built a broader understanding of how digital products come together: understanding people and their needs, knowing how solutions are built, and helping teams deliver meaningful work.
              </p>
            </div>
            <div className="experience-pillars" aria-label="My experience across design, development, and management">
              <span>Design <b>01</b></span>
              <span>Development <b>02</b></span>
              <span>Management <b>03</b></span>
              <span className="experience-toggle" aria-hidden="true">
                {experienceOpen ? 'Hide experience' : 'View experience'}
                <b className="experience-toggle__icon">↓</b>
              </span>
            </div>
          </aside>

          <div
            className={`experience-disclosure ${experienceOpen ? 'is-open' : ''}`}
            id="experience-details"
            aria-hidden={!experienceOpen}
            ref={experienceDisclosureRef}
          >
            <div className="experience-disclosure__inner">
              <div className="experience-list">
                {experience.map((role, index) => (
                  <article
                    className="experience-item scroll-reveal"
                    key={`${role.company}-${role.role}`}
                    style={{ '--reveal-delay': `${index * 100}ms` }}
                  >
                    <div className="experience-top">
                      <h3 className="experience-role">{role.role}</h3>
                      <span className="experience-date">{role.date}</span>
                    </div>
                    <p className="experience-company">{role.company}</p>
                    <ul>
                      {role.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section skills reveal">
          <div className="section-head">
            <div>
              <span className="kicker">Capabilities</span>
              <h2 className="section-title">Design, development and delivery.</h2>
            </div>
          </div>

          <div className="skills-wrap">
            {skillGroups.map((group, index) => (
              <article
                className={`skill-card skill-card--${group.icon}`}
                key={group.title}
                style={{ '--skill-delay': `${index * -1.7}s` }}
              >
                <div className="skill-card__heading">
                  <span className="skill-icon">
                    <span className="skill-icon__orbit" />
                    <CapabilityIcon name={group.icon} />
                  </span>
                  <h3>{group.title}</h3>
                </div>
                <span className="skill-card__rule" />
                <div className="skill-tags">
                  {group.skills.map((skill, skillIndex) => (
                    <span
                      className="skill-tag"
                      key={skill}
                      style={{ '--tag-delay': `${skillIndex * 0.06}s` }}
                    >
                      <CapabilityIcon name={group.icon} />
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section education reveal">
          <div className="section-head">
            <div>
              <span className="kicker">Education</span>
              <h2 className="section-title">Academic foundation.</h2>
            </div>
          </div>

          <div className="education-grid">
            {education.map((item) => (
              <article className="edu-card" key={item.degree}>
                <img src={item.image} alt={`${item.school} logo`} />
                <h3>{item.degree}</h3>
                <p className="edu-meta">
                  {item.school} • {item.location}
                </p>
                <ul>
                  <li>{item.dates}</li>
                  <li>{item.note}</li>
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact reveal">
          <div className="contact-wrap scroll-reveal">
            <div className="contact-copy">
              <span className="kicker">Contact</span>
              <h2 className="section-title">Have something interesting in mind?</h2>
              <p>
                I&apos;m always interested in meaningful projects, creative collaborations and opportunities to build better digital experiences.
              </p>
            </div>

            <div className="contact-cta">
              <ul className="contact-list">
                <li className="contact-item">
                  <a href="mailto:subinmain100@gmail.com">
                    <span className="contact-icon"><ContactIcon name="email" /></span>
                    <span>subinmain100@gmail.com</span>
                  </a>
                </li>
                <li className="contact-item">
                  <a href="https://linkedin.com/in/subinrat" target="_blank" rel="noreferrer">
                    <span className="contact-icon"><ContactIcon name="linkedin" /></span>
                    <span>LinkedIn</span>
                    <span className="contact-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
                <li className="contact-item">
                  <a href="https://github.com/SubinHaku" target="_blank" rel="noreferrer">
                    <span className="contact-icon"><ContactIcon name="github" /></span>
                    <span>GitHub</span>
                    <span className="contact-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
                <li className="contact-item">
                  <a href="https://www.behance.net/gallery/242948817/Inventory-Management-System" target="_blank" rel="noreferrer">
                    <span className="contact-icon"><ContactIcon name="behance" /></span>
                    <span>Behance</span>
                    <span className="contact-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
                <li className="contact-item contact-item--location">
                  <span className="contact-location">
                    <span className="contact-icon"><ContactIcon name="location" /></span>
                    <span>Glasgow, Scotland</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>© 2026 Subin Ratna Tuladhar</div>
        <div className="footer-links">
          <button type="button" className="nav-link" onClick={() => handleNavigate('about')}>About</button>
          <button type="button" className="nav-link" onClick={() => handleNavigate('work')}>Work</button>
          <button type="button" className="nav-link" onClick={() => handleNavigate('contact')}>Contact</button>
        </div>
      </footer>

      <button type="button" className="scroll-top" aria-label="Back to top" onClick={() => handleNavigate('home')}>
        ↑
      </button>

      <ChatDock />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
