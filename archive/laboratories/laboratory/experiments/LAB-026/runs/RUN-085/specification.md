# StratumFlow

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:49.109875Z
**Run ID**: RUN-085
**Seed**: 1700000085

---

## Architecture

- Architecture: hierarchical
- Node Type: heterogeneous
- Quorum Type: flexible

## Leader Election

- Method: timestamp_based
- Term/Epochs: False
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: write_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: True

## Log Replication

- Type: command_log
- Structure: ring_buffer
- Commit Method: batch_commit

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: size_based

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: heartbeat
- Model: byzantine

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 108ms
- Election Timeout Base: 415ms
- Election Timeout Range: 189ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat

## State Machine

- Type: simple_state
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:timestamp_based
- voting:write_quorum
- vote_granting:grant_to_highest_term
- concept:vote_revocations
- log:command_log
- log_structure:ring_buffer
- commit:batch_commit
- recovery:hybrid_recovery
- snapshot:size_based
- dynamic_membership:full_dynamic
- failure_detection:heartbeat
- concept:heartbeat

---

## Simulation Results

### 3 Nodes

- Election Attempts: 49
- Elections Succeeded: 40
- Election Success Rate: 81.63%
- Messages Sent: 161
- Commits: 26
- Avg Messages/Commit: 6.19
- Leader Changes: 40
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 65
- Elections Succeeded: 56
- Election Success Rate: 86.15%
- Messages Sent: 362
- Commits: 21
- Avg Messages/Commit: 17.24
- Leader Changes: 56
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 38
- Elections Succeeded: 36
- Election Success Rate: 94.74%
- Messages Sent: 320
- Commits: 26
- Avg Messages/Commit: 12.31
- Leader Changes: 36
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 51
- Elections Succeeded: 51
- Election Success Rate: 100.00%
- Messages Sent: 653
- Commits: 27
- Avg Messages/Commit: 24.19
- Leader Changes: 51
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

