import yt_dlp

def download_video(url):
    # 다운로드 옵션 설정
    ydl_opts = {
        'format': 'best', # 가장 화질이 좋은 영상 선택
        'outtmpl': '%(title)s.%(ext)s', # 파일명을 영상 제목으로 설정
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

# 실행 예시
video_url = input("다운로드할 영상의 URL을 입력하세요: ")
download_video(video_url)