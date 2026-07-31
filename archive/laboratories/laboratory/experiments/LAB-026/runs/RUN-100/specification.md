# NexusSync

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:49.893316Z
**Run ID**: RUN-100
**Seed**: 1700000100

---

## Architecture

- Architecture: fully_distributed
- Node Type: uniform
- Quorum Type: hierarchical

## Leader Election

- Method: rotation
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: flexible_quorum
- Vote Granting: grant_to_candidate
- Vote Revocations: False

## Log Replication

- Type: state_machine
- Structure: ring_buffer
- Commit Method: pipeline_commit

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: log_compaction

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: phi_accrual
- Model: omission

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 94ms
- Election Timeout Base: 400ms
- Election Timeout Range: 102ms

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

- Type: lua_script
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:rotation
- concept:term_epochs
- concept:randomized_timeout
- voting:flexible_quorum
- vote_granting:grant_to_candidate
- log:state_machine
- log_structure:ring_buffer
- commit:pipeline_commit
- recovery:hybrid_recovery
- snapshot:log_compaction
- dynamic_membership:full_dynamic
- failure_detection:phi_accrual

---

## Simulation Results

### 3 Nodes

- Election Attempts: 63
- Elections Succeeded: 52
- Election Success Rate: 82.54%
- Messages Sent: 164
- Commits: 10
- Avg Messages/Commit: 16.40
- Leader Changes: 52
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 53
- Elections Succeeded: 49
- Election Success Rate: 92.45%
- Messages Sent: 303
- Commits: 18
- Avg Messages/Commit: 16.83
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 58
- Elections Succeeded: 49
- Election Success Rate: 84.48%
- Messages Sent: 425
- Commits: 20
- Avg Messages/Commit: 21.25
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 60
- Elections Succeeded: 53
- Election Success Rate: 88.33%
- Messages Sent: 501
- Commits: 19
- Avg Messages/Commit: 26.37
- Leader Changes: 53
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

