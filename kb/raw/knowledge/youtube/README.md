# Patent Filing Knowledge Base

> YouTube 视频知识库：DIY Patent Application & Provisional Filing

## 目录结构

```
patent-filing-kb/
├── README.md
├── youtube/                      # YouTube 原始数据
│   ├── metadata/videos.json     # 所有视频元数据索引
│   ├── transcripts/             # 原始字幕 ({video_id}.txt)
│   ├── comments/                # 视频评论列表 ({video_id}.json)
│   └── channels/                # 发布者频道信息 ({video_id}.json)
└── knowledge/                    # 提炼后的知识内容
    ├── summaries/               # AI 内容总结 ({video_id}.md)
    └── batch_reports/           # 批次简报
```

## 视频索引

通过 `youtube/metadata/videos.json` 或 `skills/patent-knowledge` 查询。

## 主题分类

| Topic              | 关键词                         | 说明             |
| ------------------ | ------------------------------ | ---------------- |
| Provisional Filing | provisional, PPA, 临时专利     | 临时专利申请流程 |
| Prior Art Search   | prior art, patent search, 检索 | 专利检索方法     |
| Software Patent    | software, 软件                 | 软件专利相关     |
| DIY/自己申请       | DIY, yourself, 自己            | 自主申请指南     |
| 常见错误           | mistake, error, 错误           | 申请中的坑       |
| USPTO 官方         | USPTO, Patent Center           | 官方流程         |

## 搜索关键词

- DIY patent application
- Provisional patent filing
- How to file provisional patent
- Patent search tutorial
- Software patent
- Prior art search

## 更新日志

- 2026-03-11: 初始化知识库
- 2026-03-12: 重组目录结构（youtube / knowledge 分层）
