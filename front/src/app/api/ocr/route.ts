import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { image } = await req.json();
    console.log("Received image data. Length:", image.length); // 1. 이미지 데이터 수신 확인

    const API_KEY = process.env.GOOGLE_VISION_API_KEY;
    if (!API_KEY) {
      console.error("API Key is not set."); // 2. API 키 누락 확인
      return NextResponse.json({ error: 'API key is not set' }, { status: 500 });
    }

    const res = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [
            {
              image: { content: image },
              features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
            },
          ],
        }),
      }
    );
    console.log("Status from Google Vision API:", res.status); // 3. Google API 응답 상태 확인

    const result = await res.json();
    console.log("Result from Google Vision API:", JSON.stringify(result, null, 2)); // 4. Google API 응답 내용 확인

    const text = result.responses?.[0]?.fullTextAnnotation?.text || 'No text found';

    return NextResponse.json({ text });
  } catch (error) {
    console.error("An error occurred:", error); // 5. 기타 예외 처리
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}