import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import java.io.InputStream;

public class Main {

    // 원격 서버(웹 서버) 정보
    private static final String REMOTE_HOST = "웹서버_IP_주소_또는_호스트명"; // 예: "192.168.1.100"
    private static final String REMOTE_USER = "웹서버_로그인_사용자명"; // 예: "webuser"
    private static final String REMOTE_PASSWORD = "웹서버_로그인_비밀번호"; // **보안에 주의하세요**
    private static final int SSH_PORT = 22;

    // 삭제할 파일 경로 (원격 서버 기준)
    private static final String FILE_TO_DELETE = "/home/" + REMOTE_USER + "/temp/test_file.txt";

    public static void main(String[] args) {
        Session session = null;
        ChannelExec channel = null;

        try {
            // 1. JSch 객체 생성
            JSch jsch = new JSch();
            
            // 2. SSH 세션 연결
            System.out.println("Connecting to " + REMOTE_USER + "@" + REMOTE_HOST + "...");
            session = jsch.getSession(REMOTE_USER, REMOTE_HOST, SSH_PORT);
            
            // 비밀번호 설정 (SSH Key 사용을 강력히 권장합니다.)
            session.setPassword(REMOTE_PASSWORD);
            
            // 호스트 키 검증을 비활성화 (보안을 위해 실제 환경에서는 키 검증을 활성화해야 합니다!)
            session.setConfig("StrictHostKeyChecking", "no"); 
            
            session.connect();
            System.out.println("Connection successful.");

            // 3. Command 실행 채널 열기
            String command = "rm -f " + FILE_TO_DELETE; // Unix 'rm' 명령어로 파일 삭제
            System.out.println("Executing command: " + command);
            
            channel = (ChannelExec) session.openChannel("exec");
            channel.setCommand(command);

            // 4. 명령 실행 및 결과 스트림 설정
            InputStream commandOutput = channel.getInputStream();
            channel.connect();

            // 5. 명령 실행 결과 대기 및 출력
            byte[] tmp = new byte[1024];
            while (true) {
                while (commandOutput.available() > 0) {
                    int i = commandOutput.read(tmp, 0, 1024);
                    if (i < 0) break;
                    System.out.print(new String(tmp, 0, i)); // 명령의 표준 출력
                }
                if (channel.isClosed()) {
                    if (commandOutput.available() > 0) continue;
                    System.out.println("\nExit Status: " + channel.getExitStatus());
                    break;
                }
                Thread.sleep(100);
            }
            
            // 6. 결과 확인
            if (channel.getExitStatus() == 0) {
                System.out.println("✅ File deletion successful: " + FILE_TO_DELETE);
            } else {
                System.err.println("❌ File deletion failed. Check logs/permissions.");
            }

        } catch (Exception e) {
            System.err.println("An error occurred during SSH operation: " + e.getMessage());
            e.printStackTrace();
        } finally {
            // 7. 자원 해제
            if (channel != null) {
                channel.disconnect();
            }
            if (session != null) {
                session.disconnect();
                System.out.println("Session disconnected.");
            }
        }
    }
}