import AssistantSpeechIndicator from '@/app/interview/components/call/AssistantSpeechIndicator'
import Button from "@/app/interview/Button";
import VolumeLevel from "@/app/interview/components/call/VolumeLevel";

const ActiveCallDetail = ({ assistantIsSpeaking, volumeLevel, onEndCallClick }) => {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
                    width: "400px",
                    height: "200px",
                }}
            >
                <AssistantSpeechIndicator isSpeaking={assistantIsSpeaking} />
                <VolumeLevel volume={volumeLevel} />
            </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                <Button label="End Call" onClick={onEndCallClick} />
            </div>
        </div>
    );
};

export default ActiveCallDetail;
