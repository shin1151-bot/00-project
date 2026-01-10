import yt_dlp
import os
import sys
import shutil

def download_video(url):
    print(f"다운로드 시작: {url}")
    
    # 다운로드 경로 설정
    download_folder = r"C:\Users\user\Desktop\유튜브\YOUTUBE"
    if not os.path.exists(download_folder):
        os.makedirs(download_folder)
        print(f"폴더 생성: {download_folder}")

    # ffmpeg 설치 여부 확인
    ffmpeg_available = shutil.which("ffmpeg") is not None
    
    if ffmpeg_available:
        # ffmpeg가 있으면 4K/고화질 병합 모드 사용
        print("INFO: FFmpeg가 감지되었습니다. 고화질(4K) 다운로드를 시도합니다.")
        format_option = 'bestvideo+bestaudio/best'
    else:
        # ffmpeg가 없으면 단일 파일 최고 화질 모드 (보통 720p/1080p)
        print("WARNING: FFmpeg가 설치되어 있지 않습니다. 비디오/오디오 병합이 불가능하여 단일 파일 최고 화질로 다운로드합니다.")
        print("고화질(4K)을 원하시면 FFmpeg를 설치해주세요.")
        format_option = 'best'

    ydl_opts = {
        'format': format_option,
        'outtmpl': os.path.join(download_folder, '%(title)s.%(ext)s'),        # 파일명 및 경로 설정
        'noplaylist': True,                    # 플레이리스트의 경우 영상 하나만 다운로드
    }
    
    # 병합 옵션은 ffmpeg가 있을 때만 추가
    if ffmpeg_available:
        ydl_opts['merge_output_format'] = 'mp4'
        ydl_opts['postprocessors'] = [{
            'key': 'FFmpegVideoConvertor',
            'preferedformat': 'mp4',
        }]
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])
        print("다운로드 완료!")
    except Exception as e:
        print(f"오류 발생: {e}")

if __name__ == "__main__":
    print("=== 4K/고화질 유튜브 다운로더 (yt-dlp) ===")
    
    while True:
        video_url = input("\n다운로드할 영상의 URL을 입력하세요 (종료하려면 'q' 입력): ").strip()
        if video_url.lower() == 'q':
            print("프로그램을 종료합니다.")
            break
        if not video_url:
            continue
            
        download_video(video_url)