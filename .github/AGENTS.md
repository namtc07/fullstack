---
name: AGENTS.md
description: Describe when these instructions should be loaded by the agent based on task context
# applyTo: 'Describe when these instructions should be loaded by the agent based on task context' # when provided, instructions will automatically be added to the request context when the pattern matches an attached file
---

<!-- Tip: Use /create-instructions in chat to generate content with agent assistance -->

# Quy tắc làm việc với Codex || Copilot || Claude

## Ngôn ngữ

- Luôn trả lời bằng tiếng Việt.
- Giữ văn phong trực tiếp, rõ ràng, tập trung vào việc cần làm.

## Tối ưu quota

- Các rule trong mục này được xem là mặc định cho mọi session làm việc trong repo này, trừ khi người dùng ghi đè rõ ràng trong phiên hiện tại.
- Khi thấy người dùng đổi sang một chủ đề lớn khác hẳn, hãy nhắc cân nhắc mở session mới để giảm context thừa.
- Khi người dùng paste quá nhiều code hoặc mô tả quá rộng, hãy nhắc chỉ gửi đúng đoạn code, file hoặc log liên quan trực tiếp.
- Khi yêu cầu không cần đào sâu, hãy chủ động gợi ý người dùng dùng kiểu yêu cầu ngắn như `trả lời ngắn`, `chỉ nêu fix`, `không cần giải thích dài`.
- Với task lớn trong repo, ưu tiên đọc theo từng file hoặc từng khu vực liên quan trước; không quét toàn repo nếu chưa cần.
- Không mặc định chạy `lint`, `test` hoặc `build` cho mọi thay đổi nhỏ. Chỉ đề xuất hoặc chạy verify khi mức rủi ro của task đủ cao, khi người dùng yêu cầu, hoặc khi cần xác nhận fix.
- Nếu người dùng muốn tối ưu thời gian và quota, có thể dồn bước verify tổng thể như `npm run build` về cuối trước khi push code, miễn là task không thuộc nhóm dễ gây regressions rộng.
- Với thay đổi có rủi ro cao như sửa logic core, state phức tạp, data flow, shared component, config build, routing hoặc API contract, phải ưu tiên chất lượng kết quả hơn tối ưu quota và cần nêu rõ verify nào nên chạy.
- Chỉ nhắc các điểm trên khi việc tối ưu này không làm giảm đáng kể độ chính xác, khả năng debug, review hoặc chất lượng implement.
- Nếu task đang mơ hồ, liên quan nhiều module, hoặc có rủi ro bỏ sót nguyên nhân gốc, được phép không tối ưu quota quá mức và phải ưu tiên chất lượng kết quả.

## Protocol bắt buộc

Với mọi task liên quan tới repo, code, frontend, backend, review, debug hoặc thay đổi file, ưu tiên theo đúng thứ tự:

1. Analysis
2. Approach
3. Decision
4. Implementation
5. Self Review & Verify

Với task phức tạp hoặc có thay đổi code:

- BẮT BUỘC dùng đầy đủ 5 bước
  Với task đơn giản:
- Có thể rút gọn, nhưng không được bỏ qua tư duy phân tích

## Nội dung từng bước

Khi task đủ cụ thể, dùng cấu trúc sau:

### Analysis

- Input: yêu cầu, file, context hoặc dữ liệu đầu vào.
- Output: kết quả cần tạo ra.
- State: state, API, route, component hoặc module liên quan.
- Edge cases: các trường hợp biên cần lưu ý.

### Approach

- Cách 1: phương án chính.
- Cách 2: phương án thay thế.
- Trade-off: so sánh ngắn gọn giữa 2 phương án.

### Decision

- Chọn một phương án và nêu lý do kỹ thuật.

### Implementation

- Thực hiện thay đổi, hoặc nếu task chưa đủ rõ thì nói rõ không thể implement.

### Self Review & Verify

Trước khi kết thúc, tự kiểm tra:

- Đã đúng yêu cầu chưa
- Có bỏ sót scope hoặc edge case nào không
- Đã verify gì
- Chưa verify gì và vì sao
- Rủi ro còn lại hoặc assumption còn treo
- Có cần chạy lint, typecheck, test hoặc build không.
- Nếu không chạy được kiểm tra nào, phải nói rõ lý do.

## Implementation

- Chỉ bắt đầu sửa code sau khi đã hoàn thành Analysis, Approach và Decision.
- Giữ thay đổi đúng phạm vi task.
- Không revert thay đổi có sẵn của người dùng nếu không được yêu cầu rõ ràng.
- Ưu tiên pattern, component và helper hiện có trong repo.
- Giữ solution maintainable.
- Không over-engineer.
- Giữ convention nhất quán với codebase hiện có.

### Codebase alignment

- Trước khi implement, ưu tiên xác định pattern, thư viện, component và cách tổ chức đang được sử dụng ở khu vực liên quan trong repo.
- Nếu repo đã có abstraction cho cùng loại bài toán (UI component, hook, service, util), nên ưu tiên tái sử dụng thay vì tự viết mới.
- Tránh tự đổi style triển khai (UI, state, data fetching, form handling, validation, routing) nếu repo đã có cách làm nhất quán.

- Với UI:
  - Tránh tự dựng từ HTML/CSS thuần nếu repo đang dùng UI library, design system hoặc shared component.
  - Ưu tiên sử dụng các component có sẵn như Table, Form, Modal, Button, Input… từ thư viện hoặc internal component.

- Với các màn phổ biến (list, table, form, detail, modal, CRUD flow):
  - Nên tham khảo 1–2 màn tương tự trong repo.
  - Bám theo structure, naming, layout, state flow và cách gọi API hiện có.

- Với data flow:
  - Ưu tiên bám theo thư viện và pattern đang dùng trong repo (query/mutation, form library, state management).
  - Tránh introduce cách mới nếu không thực sự cần thiết.

- Nếu repo tồn tại nhiều pattern:
  - Ưu tiên pattern gần nhất với khu vực đang sửa hoặc pattern mới hơn đang được dùng ổn định.
  - Nếu chưa rõ chuẩn, nên nêu assumption trước khi implement.

- Hạn chế tạo mới component/hook/service nếu đã có logic tương đương có thể tái sử dụng.

## Task-specific rules

### Frontend task

Khi người dùng dùng hoặc nhắc tới `fe-task`, yêu cầu cần được hiểu theo brief sau:

- Goal: mục tiêu cần đạt.
- Input: dữ liệu hoặc context đầu vào.
- Output: UI, behavior hoặc file cần tạo/sửa.
- State involved: state, form, query param, store, API state liên quan.
- Edge cases: loading, empty, error, permission, responsive hoặc data thiếu.
- Constraints: design system, component bắt buộc, API contract hoặc giới hạn kỹ thuật.
- Expected approach: hướng triển khai mong muốn nếu người dùng có nêu.

Nếu chỉ nhận được `fe-task` mà không có Goal hoặc context cụ thể, không được tự suy đoán để sửa code.

### Code review

Khi người dùng yêu cầu review hoặc dùng `ai-review`, review như senior frontend engineer.

Chỉ tập trung vào:

- Correctness.
- Edge cases.
- Performance.
- Maintainability.
- Consistency với codebase hiện có.

Rules:

- Không rewrite toàn bộ.
- Chỉ nêu những điểm thực sự nên thay đổi.
- Nếu phần nào chấp nhận được, nói ngắn gọn.
- Findings phải có file/line khi có thể.

### Bug investigation

Khi người dùng báo bug hoặc dùng `ai-bug`, làm theo flow:

1. Restate the bug.
2. List likely root causes.
3. Identify files / areas to inspect.
4. Propose 2 fix options.
5. Choose the safest fix.
6. Provide patch.
7. Self Review & Verify.

Flow này vẫn phải nằm trong format chính: Analysis → Approach → Decision → Implementation → Self Review & Verify.

### Refactor

Khi người dùng yêu cầu refactor hoặc dùng `ai-refactor`, tuân thủ:

- Preserve behavior.
- Improve readability.
- Reduce duplication.
- Do not over-abstract.
- Keep naming aligned with the project.

Trước khi viết code:

1. Explain current problems.
2. Propose refactor approach.
3. Mention trade-offs.
4. Then provide the refactored code.
5. End with a self-review (Self Review & Verify).

## Response Modes

Người dùng có thể override bằng keyword:

- `short`: trả lời ngắn, bỏ bớt explanation
- `fix-only`: chỉ đưa patch/code
- `no-protocol`: không cần 5 bước
- `deep-dive`: phân tích sâu + đầy đủ protocol

## Priority

1. Correctness
2. Maintainability
3. Clarity
4. Quota optimization

## Other

- Ưu tiên trả về dạng diff / patch thay vì rewrite toàn bộ file
- Không sửa ngoài phạm vi yêu cầu, kể cả thấy code xấu
- Không fix khi chưa xác định được root cause
