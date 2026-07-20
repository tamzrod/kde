# HelixConsensus

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:46.866359Z
**Run ID**: RUN-042
**Seed**: 1700000042

---

## Architecture

- Architecture: centralized_leader
- Node Type: uniform
- Quorum Type: weighted

## Leader Election

- Method: term_based
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: read_quorum
- Vote Granting: grant_to_candidate
- Vote Revocations: False

## Log Replication

- Type: replicated_log
- Structure: ring_buffer
- Commit Method: quorum_commit

## Recovery

- Strategy: log_catchup
- Snapshot Policy: log_compaction

## Membership

- Model: remove_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: swim_like
- Model: byzantine

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 209ms
- Election Timeout Base: 343ms
- Election Timeout Range: 157ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- leader_announce

## State Machine

- Type: deterministic
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:term_based
- concept:randomized_timeout
- voting:read_quorum
- vote_granting:grant_to_candidate
- log:replicated_log
- log_structure:ring_buffer
- commit:quorum_commit
- recovery:log_catchup
- snapshot:log_compaction
- dynamic_membership:remove_node
- failure_detection:swim_like

---

## Simulation Results

### 3 Nodes

- Election Attempts: 46
- Elections Succeeded: 39
- Election Success Rate: 84.78%
- Messages Sent: 152
- Commits: 14
- Avg Messages/Commit: 10.86
- Leader Changes: 39
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 60
- Elections Succeeded: 55
- Election Success Rate: 91.67%
- Messages Sent: 340
- Commits: 18
- Avg Messages/Commit: 18.89
- Leader Changes: 55
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 50
- Elections Succeeded: 49
- Election Success Rate: 98.00%
- Messages Sent: 488
- Commits: 28
- Avg Messages/Commit: 17.43
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 63
- Elections Succeeded: 61
- Election Success Rate: 96.83%
- Messages Sent: 602
- Commits: 28
- Avg Messages/Commit: 21.50
- Leader Changes: 61
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

