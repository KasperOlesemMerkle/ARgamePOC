import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  ViroTrackingReason, ViroARTrackingTargets, ViroARImageMarker, ViroBox,
} from "@viro-community/react-viro";

ViroARTrackingTargets.createTargets({
  "gameBoard": {
    source: require('./assets/boardgame.png'),
    orientation: "Up",
    physicalWidth: 0.157, // real world width in meters
    type: 'Image'
  },
});

const HelloWorldSceneAR = () => {
  const [text, setText] = useState("Initializing AR...");
  const [isTracking, setIsTracking] = useState(false);

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("guncelleme", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Hello World!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
      <ViroARImageMarker
        target="gameBoard"
        onAnchorFound={() => setIsTracking(true)}
      >
        {isTracking && (
          <>
            <ViroText text="Game Board Found!" position={[0, 0.1, 0.6]} />
            <ViroBox position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]}  />
            <ViroBox position={[0.1, 0.1, 0.1]} scale={[0.1, 0.1, 0.1]} />
          </>
        )}
      </ViroARImageMarker>
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
