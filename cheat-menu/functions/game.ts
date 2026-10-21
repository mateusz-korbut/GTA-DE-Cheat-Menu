const MODEL_LOAD_TIMEOUT = 5000;

export const loadModel = (modelId: number): boolean => {
    if (modelId === null || modelId === undefined || modelId <= 0) {
        return false;
    }
    Streaming.RequestModel(modelId);

    const startTime = Date.now();
    while (!Streaming.HasModelLoaded(modelId)) {
        if (Date.now() - startTime > MODEL_LOAD_TIMEOUT) {
            return false;
        }
        wait(50);
    }

    return true;
}
