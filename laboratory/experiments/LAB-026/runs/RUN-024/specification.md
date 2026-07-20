# StratumUnion

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.913882Z
**Run ID**: RUN-024
**Seed**: 1700000024

---

## Architecture

- Architecture: centralized_leader
- Node Type: heterogeneous
- Quorum Type: flexible

## Leader Election

- Method: load_balanced
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: weighted_votes
- Vote Granting: grant_if_log_newer
- Vote Revocations: True

## Log Replication

- Type: state_machine
- Structure: append_only_array
- Commit Method: batch_commit

## Recovery

- Strategy: log_catchup
- Snapshot Policy: adaptive

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: explicit_probe
- Model: crash_recovery

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 438ms
- Election Timeout Base: 321ms
- Election Timeout Range: 166ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- term_update

## State Machine

- Type: lua_script
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:load_balanced
- concept:randomized_timeout
- voting:weighted_votes
- vote_granting:grant_if_log_newer
- concept:vote_revocations
- log:state_machine
- log_structure:append_only_array
- commit:batch_commit
- recovery:log_catchup
- snapshot:adaptive
- dynamic_membership:full_dynamic
- failure_detection:explicit_probe

---

## Simulation Results

### 3 Nodes

- Election Attempts: 36
- Elections Succeeded: 25
- Election Success Rate: 69.44%
- Messages Sent: 135
- Commits: 7
- Avg Messages/Commit: 19.29
- Leader Changes: 25
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 56
- Elections Succeeded: 48
- Election Success Rate: 85.71%
- Messages Sent: 283
- Commits: 14
- Avg Messages/Commit: 20.21
- Leader Changes: 48
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 61
- Elections Succeeded: 54
- Election Success Rate: 88.52%
- Messages Sent: 456
- Commits: 23
- Avg Messages/Commit: 19.83
- Leader Changes: 54
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 60
- Elections Succeeded: 51
- Election Success Rate: 85.00%
- Messages Sent: 361
- Commits: 28
- Avg Messages/Commit: 12.89
- Leader Changes: 51
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

