/// <reference path='../../.config/sa.d.ts' />

export const loadModel = async (modelId: number) => {
    Streaming.RequestModel(modelId);

    while (!Streaming.HasModelLoaded(modelId)) {
        await asyncWait(250);
    }
}
