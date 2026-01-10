import os
import glob
import subprocess
import shutil

# 설정
TARGET_FOLDER = r"C:\Users\user\Desktop\유튜브\YOUTUBE"
OUTPUT_FOLDER = os.path.join(TARGET_FOLDER, "GIFs")

def create_gif_from_video():
    print(f"=== 동영상 → GIF(움짤) 만들기 (FFmpeg) ===")
    print(f"대상 폴더: {TARGET_FOLDER}")
    
    if not shutil.which("ffmpeg"):
        print("Error: FFmpeg가 설치되어 있지 않습니다.")
        return

    if not os.path.exists(OUTPUT_FOLDER):
        os.makedirs(OUTPUT_FOLDER)

    video_files = glob.glob(os.path.join(TARGET_FOLDER, "*.mp4"))
    
    if not video_files:
        print("변환할 동영상 파일(.mp4)이 없습니다.")
        return

    print(f"\n발견된 동영상 ({len(video_files)}개).")
    
    # 옵션 설정
    print("\n[설정] GIF 품질과 크기를 선택하세요.")
    print("1. 고화질 (크기 큼, 15fps, 너비 640px)")
    print("2. 초고화질 (매우 큼, 30fps, 너비 960px -> 4K 원본엔 부담될 수 있음)")
    print("3. 웹용 (가벼움, 10fps, 너비 480px)")
    choice = input("선택 (1/2/3): ").strip()

    if choice == '2':
        fps = 30
        width = 960
    elif choice == '3':
        fps = 10
        width = 480
    else:
        fps = 15
        width = 640

    for vid_path in video_files:
        filename = os.path.basename(vid_path)
        name_without_ext = os.path.splitext(filename)[0]
        output_path = os.path.join(OUTPUT_FOLDER, f"{name_without_ext}.gif")
        
        # 이미 존재하면 건너뛰기
        if os.path.exists(output_path):
            print(f"Skipping (이미 존재): {filename}")
            continue

        print(f"변환 중: {filename} -> GIF ...", end="")
        
        # FFmpeg GIF 변환 (Palettegen + Paletteuse 방식이 가장 고화질)
        # 1. 팔레트 생성 -> 2. GIF 생성
        # 복잡하므로 filter_complex 사용
        
        # 필터: fps 설정, 리사이즈, 팔레트 생성 및 적용을 한방에
        # split [a][b]; [a] palettegen [p]; [b][p] paletteuse
        filter_str = f"fps={fps},scale={width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse"
        
        command = [
            "ffmpeg",
            "-i", vid_path,
            "-vf", filter_str,
            "-y", # 덮어쓰기
            output_path
        ]
        
        try:
            # 로그 숨기기 위해 stdout/stderr 처리
            subprocess.run(command, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            print(" [완료]")
        except subprocess.CalledProcessError:
            print(" [실패]")

    print(f"\n모든 작업이 완료되었습니다.")
    print(f"저장 위치: {OUTPUT_FOLDER}")

if __name__ == "__main__":
    create_gif_from_video()
