# BastionProtocol

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:49.579255Z
**Run ID**: RUN-094
**Seed**: 1700000094

---

## Architecture

- Architecture: ring_based
- Node Type: uniform
- Quorum Type: weighted

## Leader Election

- Method: timestamp_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: write_quorum
- Vote Granting: grant_if_no_voted
- Vote Revocations: False

## Log Replication

- Type: replicated_log
- Structure: hash_chain
- Commit Method: pipeline_commit

## Recovery

- Strategy: state_transfer
- Snapshot Policy: size_based

## Membership

- Model: static
- Add Node: 
- Remove Node: 

## Failure Handling

- Detection: explicit_probe
- Model: crash_recovery

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 428ms
- Election Timeout Base: 247ms
- Election Timeout Range: 224ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- term_update

## State Machine

- Type: deterministic
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:timestamp_based
- concept:term_epochs
- concept:randomized_timeout
- voting:write_quorum
- vote_granting:grant_if_no_voted
- log:replicated_log
- log_structure:hash_chain
- commit:pipeline_commit
- recovery:state_transfer
- snapshot:size_based
- failure_detection:explicit_probe

---

## Simulation Results

### 3 Nodes

- Election Attempts: 63
- Elections Succeeded: 37
- Election Success Rate: 58.73%
- Messages Sent: 166
- Commits: 19
- Avg Messages/Commit: 8.74
- Leader Changes: 37
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 59
- Elections Succeeded: 49
- Election Success Rate: 83.05%
- Messages Sent: 347
- Commits: 21
- Avg Messages/Commit: 16.52
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 59
- Elections Succeeded: 51
- Election Success Rate: 86.44%
- Messages Sent: 305
- Commits: 14
- Avg Messages/Commit: 21.79
- Leader Changes: 51
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 68
- Elections Succeeded: 65
- Election Success Rate: 95.59%
- Messages Sent: 641
- Commits: 27
- Avg Messages/Commit: 23.74
- Leader Changes: 65
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

