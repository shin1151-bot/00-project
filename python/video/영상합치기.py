import os
import subprocess
import glob
import sys
import shutil
from datetime import datetime

# 설정
TARGET_FOLDER = r"C:\Users\user\Desktop\유튜브\YOUTUBE"
OUTPUT_FILENAME = "merged_output.mp4"

def merge_videos():
    print(f"=== 동영상 합치기 프로그램 ===")
    print(f"대상 폴더: {TARGET_FOLDER}")

    # 1. FFmpeg 확인
    if not shutil.which("ffmpeg"):
        print("Error: FFmpeg가 설치되어 있지 않거나 경로(PATH)에 없습니다.")
        print("프로그램을 실행할 수 없습니다.")
        return

    # 2. 파일 목록 검색 (mp4)
    # 파일명 순으로 정렬 or 수정시간 순으로 정렬? -> 보통 이름순이 안전함
    video_files = sorted(glob.glob(os.path.join(TARGET_FOLDER, "*.mp4")))
    
    # 결과 파일이 이미 있으면 목록에서 제외 (재귀적 합침 방지)
    video_files = [f for f in video_files if os.path.basename(f) != OUTPUT_FILENAME]

    if not video_files:
        print("합칠 동영상 파일(.mp4)이 없습니다.")
        return

    print(f"\n발견된 파일 ({len(video_files)}개):")
    for f in video_files:
        print(f"- {os.path.basename(f)}")

    # FFmpeg Filter Complex 방식 사용
    # 이 방식은 모든 영상을 강제로 동일한 해상도와 FPS로 변환하여 합치므로
    # 영상 규격 차이로 인한 딜레이/싱크 밀림을 근본적으로 해결합니다.
    
    print(f"\n합치기 작업 시작... (강제 포맷 통일 모드)")
    print("해상도(1920x1080)와 FPS(30)를 통일하여 끊김 문제를 해결합니다.")
    print("모든 영상을 변환하므로 시간이 다소 걸릴 수 있습니다.")

    output_path = os.path.join(TARGET_FOLDER, OUTPUT_FILENAME)
    if os.path.exists(output_path):
        os.remove(output_path)

    # 입력 파일 구성
    input_args = []
    filter_complex_parts = []
    concat_inputs = []

    # 목표 해상도 (FHD 1920x1080)
    # 세로 영상(Shorts)이나 가로 영상 모두 이 캔버스 안에 맞춰짐 (검은 여백생성)
    WIDTH = 1920
    HEIGHT = 1080
    FPS = 30

    for i, fpath in enumerate(video_files):
        # 1. 입력 파일 추가
        input_args.extend(["-i", fpath])
        
        # 2. 필터 체인 생성
        # [0:v] -> scale -> pad -> setsar -> fps -> format -> [v0]
        # force_original_aspect_ratio=decrease: 원본 비율 유지하며 내부에 맞춤
        # pad: 남는 공간 검은색 칠하기 (중앙 정렬)
        v_tag = f"[v{i}]"
        a_tag = f"[a{i}]"
        
        video_filter = (
            f"[{i}:v]"
            f"scale={WIDTH}:{HEIGHT}:force_original_aspect_ratio=decrease,"
            f"pad={WIDTH}:{HEIGHT}:(ow-iw)/2:(oh-ih)/2,"
            f"setsar=1,"
            f"fps={FPS},"
            f"format=yuv420p"
            f"{v_tag}"
        )
        
        # 오디오 필터: 샘플레이트 48k, 스테레오 통일
        audio_filter = f"[{i}:a]aformat=sample_rates=48000:channel_layouts=stereo{a_tag}"
        
        filter_complex_parts.append(video_filter)
        filter_complex_parts.append(audio_filter)
        
        concat_inputs.append(f"{v_tag}{a_tag}")

    # 모든 필터 연결
    # [v0][a0][v1][a1]...concat=n=N:v=1:a=1[v][a]
    full_filter = ";".join(filter_complex_parts) + ";"
    full_filter += "".join(concat_inputs) + f"concat=n={len(video_files)}:v=1:a=1[v][a]"

    command = [
        "ffmpeg"
    ] + input_args + [
        "-filter_complex", full_filter,
        "-map", "[v]",
        "-map", "[a]",
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "23",
        "-c:a", "aac",
        "-b:a", "192k",
        output_path
    ]

    try:
        # 윈도우에서 긴 명령줄 처리 (argument list too long 방지)는 보통 파이썬 리스트로 넘기면 해결됨
        subprocess.run(command, check=True)
        print("\n=== 성공적으로 해결되었습니다! ===")
        print(f"결과 파일: {output_path}")
    except subprocess.CalledProcessError as e:
        print(f"\n[오류] 작업 중 문제가 발생했습니다: {e}")
    
    # 임시 파일 삭제 로직 제거 (list.txt 안씀)

if __name__ == "__main__":
    merge_videos()
    input("\n종료하려면 엔터키를 누르세요...")
