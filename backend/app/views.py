import base64
import io
import json

from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from wordcloud import WordCloud


# 真正调用词云库生成图片
def get_word_cloud(text):
    pil_img = WordCloud(width=800, height=300, background_color="white").generate(text=text).to_image()
    img = io.BytesIO()
    pil_img.save(img, "PNG")
    img.seek(0)
    img_base64 = base64.b64encode(img.getvalue()).decode()
    return img_base64


# 生成词云图片接口，以base64格式返回
@csrf_exempt
def cloud(request):
    if request.method == 'POST':
        result = json.loads(request.body)
        text = result.get('word')
        res = get_word_cloud(text)
        return JsonResponse(res, safe=False)
