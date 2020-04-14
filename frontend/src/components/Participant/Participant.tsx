import React from 'react';
import { IconButton, CardActions, Avatar, Grid, Card, CardHeader } from '@material-ui/core';
import { Videocam, VideocamOff, VolumeUp, VolumeOff, Mic, MicOff } from '@material-ui/icons';
import { Participant, VideoTrackPublication, AudioTrackPublication, Track } from 'twilio-video';

interface IProps {
  participant: Participant;
  local?: boolean;
}

const ParticipantComponent: React.FC<IProps> = ({ participant, local }) => {
  const [videoTracks, setVideoTracks] = React.useState<any>([]);
  const [audioTracks, setAudioTracks] = React.useState<any>([]);
  const [micOn, setMicOn] = React.useState<boolean>(false);
  const [muteVideoMic, setMuteVideoMic] = React.useState<boolean>(false);
  const [videoOn, setVideoOn] = React.useState<boolean>(false);

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const trackPublicationToTrack = (trackMap: Map<Track.SID, VideoTrackPublication | AudioTrackPublication>) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  React.useEffect(() => {
    const trackSubscribed = (track: Track) => {
      if (track.kind === 'video') {
        setVideoTracks((videoTracks: Track[]): Track[] => [...videoTracks, track]);
      } else {
        setAudioTracks((audioTracks: Track[]): Track[] => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track: Track) => {
      if (track.kind === 'video') {
        setVideoTracks((videoTracks: Track[]): Track[] => videoTracks.filter((v: Track) => v !== track));
      } else {
        setAudioTracks((audioTracks: Track[]): Track[] => audioTracks.filter((a: Track) => a !== track));
      }
    };

    setVideoTracks(trackPublicationToTrack(participant.videoTracks));
    setAudioTracks(trackPublicationToTrack(participant.audioTracks));

    participant.on('trackSubscribed', trackSubscribed);
    participant.on('trackUnsubscribed', trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  React.useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  React.useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  const onCloseVideoClick = () => {
    videoTracks[0].mediaStreamTrack.enabled = videoOn;
    setVideoOn(!videoOn);
  };

  return (
    <Grid item className="participant" xs={4} sm={4}>
      <Card>
        <CardHeader
          title={participant.identity}
          avatar={<Avatar aria-label="recipe">{participant.identity.charAt(0)}</Avatar>}
        />
        {console.log(videoRef)}
        {videoTracks.length > 0 ? (
          <video ref={videoRef} muted={muteVideoMic} style={{ width: '100%' }} autoPlay />
        ) : (
          'Loading...'
        )}
        {console.log('Video:', micOn, 'Audio', !micOn)}
        <audio ref={audioRef} autoPlay={true} muted={!micOn} />
        <CardActions>
          <IconButton
            style={{ borderRadius: '50px', border: '1px solid #c4c4c4' }}
            onClick={() => {
              local ? setMicOn(!micOn) : setMuteVideoMic(!muteVideoMic);
            }}
            aria-label="mute mic"
          >
            {local ? !micOn ? <MicOff /> : <Mic /> : muteVideoMic ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
          <IconButton
            style={{ borderRadius: '50px', border: '1px solid #c4c4c4' }}
            onClick={() => onCloseVideoClick()}
            aria-label="off video"
          >
            {videoOn ? <VideocamOff /> : <Videocam />}
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ParticipantComponent;
