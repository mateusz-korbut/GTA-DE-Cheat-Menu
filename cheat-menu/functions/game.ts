export const loadModel = (modelId: number) => {
    Streaming.RequestModel(modelId);

    while (!Streaming.HasModelLoaded(modelId)) {
        wait(250);
    }
}
