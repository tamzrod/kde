# CipherPact

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.132463Z
**Run ID**: RUN-047
**Seed**: 1700000047

---

## Architecture

- Architecture: decentralized
- Node Type: uniform
- Quorum Type: majority

## Leader Election

- Method: lease_based
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: read_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: False

## Log Replication

- Type: value_log
- Structure: linked_list
- Commit Method: pipeline_commit

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: size_based

## Membership

- Model: static
- Add Node: 
- Remove Node: 

## Failure Handling

- Detection: swim_like
- Model: crash_stop

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 458ms
- Election Timeout Base: 283ms
- Election Timeout Range: 76ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- leader_announce
- term_update

## State Machine

- Type: deterministic
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:lease_based
- concept:randomized_timeout
- voting:read_quorum
- vote_granting:grant_if_log_newer
- concept:majority_quorum
- log:value_log
- log_structure:linked_list
- commit:pipeline_commit
- recovery:incremental_snapshot
- snapshot:size_based
- failure_detection:swim_like

---

## Simulation Results

### 3 Nodes

- Election Attempts: 55
- Elections Succeeded: 50
- Election Success Rate: 90.91%
- Messages Sent: 220
- Commits: 24
- Avg Messages/Commit: 9.17
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 49
- Elections Succeeded: 41
- Election Success Rate: 83.67%
- Messages Sent: 224
- Commits: 15
- Avg Messages/Commit: 14.93
- Leader Changes: 41
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 56
- Elections Succeeded: 55
- Election Success Rate: 98.21%
- Messages Sent: 401
- Commits: 16
- Avg Messages/Commit: 25.06
- Leader Changes: 55
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 53
- Elections Succeeded: 44
- Election Success Rate: 83.02%
- Messages Sent: 316
- Commits: 18
- Avg Messages/Commit: 17.56
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

