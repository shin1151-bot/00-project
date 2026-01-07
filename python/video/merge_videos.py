import os
import re
from moviepy.editor import VideoFileClip, concatenate_videoclips

# ==========================================
# [설정 영역] 요청하신 경로로 변경되었습니다!
# ==========================================
SOURCE_FOLDER = r"C:\Users\user\Desktop\video"
OUTPUT_FILE = "final_master_video.mp4"
VIDEO_EXTENSIONS = ('.mp4', '.avi', '.mov', '.mkv')

def natural_sort_key(s):
    """숫자가 포함된 파일명을 숫자 크기대로 정렬 (예: 1.mp4, 2.mp4, 10.mp4)"""
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', s)]

def automate_video_merging(folder_path, output_name):
    # 1. 폴더 존재 확인 및 파일 식별
    if not os.path.exists(folder_path):
        print(f"❌ 폴더를 찾을 수 없어요: {folder_path}")
        return

    files = [f for f in os.listdir(folder_path) if f.lower().endswith(VIDEO_EXTENSIONS)]
    files.sort(key=natural_sort_key) # 이름순(숫자순) 정렬

    if not files:
        print("❌ 지정된 폴더에 영상 파일이 없습니다.")
        return

    print(f"🎬 총 {len(files)}개의 파일을 발견했습니다. 병합을 시작합니다.")

    clips = []
    try:
        # 2. 클립 로드
        for filename in files:
            file_path = os.path.join(folder_path, filename)
            print(f"➕ 추가 중: {filename}")
            clip = VideoFileClip(file_path)
            clips.append(clip)

        # 3. 해상도 처리 및 병합
        # method="compose"는 서로 다른 해상도를 중앙 정렬로 합쳐줍니다.
        final_clip = concatenate_videoclips(clips, method="compose")

        # 4. 고화질 내보내기 (libx264 코덱 사용)
        print("💾 렌더링 중... 바탕화면 'video' 폴더 내용을 합치는 중입니다.")
        final_clip.write_videofile(
            output_name, 
            codec="libx264", 
            audio_codec="aac", 
            remove_temp=True,
            fps=30
        )
        print(f"✅ 완성되었습니다! 결과 파일: {output_name}")

    except Exception as e:
        print(f"❌ 작업 중 에러 발생: {e}")

    finally:
        # 메모리 확보를 위해 모든 클립 닫기
        for clip in clips:
            clip.close()

if __name__ == "__main__":
    automate_video_merging(SOURCE_FOLDER, OUTPUT_FILE)